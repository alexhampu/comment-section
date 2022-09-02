const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

async function getAll() {
    return await prisma.comment.findMany({
        include: {
            author: true
        }
    });
}

module.exports = {
    getAll
}