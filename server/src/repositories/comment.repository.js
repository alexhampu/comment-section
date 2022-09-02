function getAll() {
    return [
        {
            id: 1,
            content: 'Hello world',
            userId: 1
        },
        {
            id: 2,
            content: 'Another comment from me',
            userId: 1
        },
        {
            id: 3,
            content: 'Hi John!',
            userId: 2
        }
    ];
}

module.exports = {
    getAll
}