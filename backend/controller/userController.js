const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
    const allData = await prisma.client.findMany({})
    res.status(200).json({
        status: "success",
        allData,
    });
    await prisma.$disconnect();

});

exports.getOne = catchAsync(async (req, res, next) => {
    const id  = req.params.id

    if (isNaN(id)) {
        const data = await prisma.client.findUnique({
            where: {
                name: req.params.id
            }
        })
        res.status(200).json({
            status: "success",
            data,
        });
    }
    else {
        const data = await prisma.client.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        res.status(200).json({
            status: "success",
            data,
        });

    }
    await prisma.$disconnect();
});

exports.deleteData = catchAsync(async (req, res, next) => {
    console.log(req.params.id)
    await prisma.client.delete({
        where: {
            id: parseInt(req.params.id),
        },
    })

    res.status(200).json({
        status: "success",
    });
    await prisma.$disconnect();

});

exports.updateData = catchAsync(async (req, res, next) => {
    console.log(req.params)
    try{
        await prisma.client.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
        });
        res.status(200).json({
            status: "success",
        });
        await prisma.$disconnect();
    }catch(err){
        console.error(err)
    }
  

});
