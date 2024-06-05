const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const { promisify } = require('util');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRED_IN
    })
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/',
        domain: 'localhost'
    };

    if (process.env.NODE_ENV === "Production") cookieOption.secure = true;

    //remove password from the output
    user.password = undefined;
    res.cookie("jwt", token, cookieOption)
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/dashboard',
        domain: 'localhost'
    })
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/akun',
        domain: 'localhost'
    })

    res.status(statusCode).json({
        status: "Success",
        token,
        data: {
            user,
        },
    });
};


const createSendTokenAdmin = (user, statusCode, res) => {
    const token = signToken(user.NIK);

    if (process.env.NODE_ENV === "Production") cookieOption.secure = true;

    //remove password from the output
    user.password = undefined;
    console.log(token)
    res.cookie("jwtadmin", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/admin',
        domain: 'localhost'
    })
    res.cookie("jwtadmin", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/data-barang',
        domain: 'localhost'
    })
    res.cookie("jwtadmin", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/user',
        domain: 'localhost'
    })
    res.cookie("jwtadmin", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // httpOnly: true, //receive cookie,store it, send it automatically along every request
        path: '/tambahbarang',
        domain: 'localhost'
    })
    res.status(statusCode).json({
        status: "Success",
        token,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
        const getEmail = await prisma.client.findUnique({
            where: {
                email: req.body.email
            }
        })
        if (getEmail?.email ) {
            return next(new AppError('Email Already Exist', 400))
        }
        const Client = await prisma.client.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            },
        });
        createSendToken(Client, 201, res);
        res.status(201).json({
            status: "success",
            Client,
        });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!password | !email) {
        return next(new AppError("Please provide email and password", 401));
    }
    console.log(req.body)
    const client = await prisma.client.findUnique({
        where: {
            email: email,
        },
    });

    if (!client || password !== client.password) {
        return next(new AppError("Incorrect email or password", 401));
    }
    createSendToken(client, 200, res);
});

exports.signupAdmin = catchAsync(async (req, res, next) => { //search for NIK 
    console.log(req.body)
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const emailUser = await prisma.admin.findUnique({
            where: {
                NIK: parseInt(req.body.NIK)
            }
        })

        if (emailUser) {
            next(new AppError('This NIK already taken! Try another', 401))
        }

        const user = await prisma.admin.create({
            data: {
                name: req.body.name,
                NIK: parseInt(req.body.NIK),
                password: hashPassword,
                division: req.body.division
            },
        });

        createSendTokenAdmin(user, 201, res);
        res.status(201).json({
            status: "success",
            user,
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error });
    }
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
    const { NIK, password } = req.body;
    if (!NIK || !password) {
        return next(new AppError('Please provide NIK and password', 400));
    }

    const admin = await prisma.admin.findUnique({
        where: {
            NIK: parseInt(NIK),
        },
    });

    if (!admin || !await bcrypt.compare(password, admin.password)) {
        return next(new AppError('Incorrect NIK or password', 401));
    }

    createSendTokenAdmin(admin, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError("You are not log in, please log in to get access", 401)
        );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await prisma.seller.findUnique({
        where: {
            id: decoded.id
        }
    })
    if (!currentUser) {
        return next(
            new AppError(
                "The token belonging to this user does no longer exist",
                401
            )
        );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});


