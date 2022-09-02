const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const data = [
    {
        name: 'John Doe',
        email: 'john@doe.com',
        comments: {
            create: [
                {
                    content: 'Hello world'
                },
                {
                    content: 'Another comment from me'
                },
            ],
        },
    },
    {
        name: 'Jane Doe',
        email: 'jane@doe.com',
        comments: {
            create: [
                {
                    content: 'Hello John'
                },
            ],
        },
    },
    {
        name: 'Tom Doe',
        email: 'tom@doe.com',
        comments: {
            create: [
                {
                    content: 'Hello, I am Tom'
                }
            ],
        },
    },
]

async function main() {
    console.log(`Seeding database`);

    for (const userData of data) {
        const user = await prisma.user.create({
            data: userData,
        })

        console.log(`User '${user.name}' created`);
    }

    console.log(`Seeding database has finished`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })