const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

async function store(authorId, content, parentId) {
    return await prisma.comment.create({
        data: {
            authorId,
            content,
            parentId
        },
        include: {
            author: true
        }
    });
}

async function getById(id) {
    return await prisma.comment.findUnique({
        where: {
            id
        },
        include: {
            author: true,
            replies: {
                include: {
                    author: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        },
    });
}

async function getAll() {
    return await prisma.comment.findMany({
        where: {
            parentId: null
        },
        include: {
            author: true,
            replies: {
                include: {
                    author: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
}

async function upvote(commentId, authorId) {
    const comment = await getById(commentId);

    if (!comment) {
        throw {
            code: 'NOT_FOUND',
            message: 'Comment not found'
        };
    }

    let totalUpvotes = comment.totalUpvotes;

    const upvote = await prisma.upvote.findFirst({
        where: {
            commentId,
            authorId
        }
    });

    let created = false;

    if (upvote) {
        totalUpvotes--;
        await prisma.upvote.deleteMany({
            where: {
                commentId,
                authorId
            }
        });
    } else {
        totalUpvotes++;
        await prisma.upvote.create({
            data: {
                commentId,
                authorId
            }
        });
        created = true;
    }

    totalUpvotes = Math.max(0, totalUpvotes);

    await prisma.comment.update({
        where: {
            id: comment.id
        },
        data: {
            totalUpvotes
        }
    });

    return {
        created,
        totalUpvotes
    };
}

async function getUpvoteByCommentAndAuthor(commentId, authorId) {
    return await prisma.upvote.findFirst({
        where: {
            commentId,
            authorId
        }
    });
}

module.exports = {
    getAll,
    getById,
    upvote,
    getUpvoteByCommentAndAuthor,
    store
}