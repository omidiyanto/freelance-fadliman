const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");


exports.createData = catchAsync(async (req, res, next) => {
    try {
        const data = await prisma.barang.findMany({
            select: {
                name: true,
                unit: true
            },
            where: {
                name: req.body.name,
            }
        })

        const dataPinjaman = await prisma.pinjaman.findUnique({
            where: {
                name: req.body.name
            }
        })
        console.log(dataPinjaman, data[0])
        if (parseInt(dataPinjaman?.unit) + parseInt(req.body.unit) > data[0].unit) {
            return next(new AppError('Stock Habis', 400))

        }
        else {
            if (!data) {
                return next(new AppError('Product tidak ada', 404))
            }

            const createData = await prisma.pinjaman.create({
                data: {
                    name: req.body.name,
                    unit: parseInt(req.body.unit),
                },
            });

            res.status(201).json({
                status: "Success",
                createData

            });
            await prisma.$disconnect();
        }


    } catch (err) {
        console.error(err);
    }
});

exports.getAllData = catchAsync(async (req, res, next) => {
    const allData = await prisma.pinjaman.findMany({})
    res.status(200).json({
        status: "success",
        allData,
    });
    await prisma.$disconnect();

});

exports.getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const data = await prisma.pinjaman.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json({
        status: "success",
        data,
    });
    await prisma.$disconnect();
});


exports.deleteData = catchAsync(async (req, res, next) => {
    await prisma.pinjaman.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })

    res.status(200).json({
        status: "success",
    });
    await prisma.$disconnect();

});

exports.deleteAllData = async (req, res, next) => {
    await prisma.pinjaman.deleteMany({});
    res.status(200).json({
        status: "success",
    });
    await prisma.$disconnect();
};

exports.updateData = catchAsync(async (req, res, next) => {
    console.log(req.params)
    await prisma.pinjaman.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            name: req.body.name,
            unit: req.body.unit,
            status: req.body.status
        },
    });
    res.status(200).json({
        status: "success",
    });
    await prisma.$disconnect();

});
