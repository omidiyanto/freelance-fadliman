const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createData = catchAsync(async (req, res, next) => {
    console.log(req.body)
    try {
        let date = new Date(req.body.expired)
        let datenow = new Date(req.body.tanggal_pembelian)
        let isoString = date.toISOString();
        const createData = await prisma.barang.create({
            data: {
                name: req.body.name,
                supplier: req.body.supplier,
                serial_number: req.body.serial_number,
                expired: isoString,
                unit: parseInt(req.body.unit),
                owner: req.body.owner,
                status: req.body.status,
                tanggal_pembelian : datenow
            },
        });


        res.status(201).json({
            status: "Success",
            createData

        });
        await prisma.$disconnect();

    } catch (err) {
        console.error(err.code)
        if (err.code == "P2002") {
            return next(new AppError('Product Duplikat', 400))
        }
        console.error(err);
    }
});

exports.getAllData = catchAsync(async (req, res, next) => {
    const allData = await prisma.barang.findMany({})
    res.status(200).json({
        status: "success",
        allData,
    });
    await prisma.$disconnect();

});

exports.getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const data = await prisma.barang.findUnique({
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
    console.log(req.params.id)
    await prisma.barang.delete({
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
    await prisma.barang.deleteMany({});
    res.status(200).json({
        status: "success",
    });
    await prisma.$disconnect();

};

exports.updateData = catchAsync(async (req, res, next) => {
    console.log(req.params)
    await prisma.barang.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            name: req.body.name,
            supplier: req.body.supplier,
            serial_number: req.body.serial_number,
            expired: req.body.expired,
            unit: req.body.unit,
            Owner: req.body.owner,
            status: req.body.status
        },
    });
    res.status(200).json({
        status: "success",
    });
    await prisma.$disconnect();

});
