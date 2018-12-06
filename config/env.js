config = {
    database: {
        name: 'mongodb://localhost:27017/IE_App'
    },
    application: {
        secret: 'secret',
        env: 'development'
    },
    pagination: {
        perPage: 10
    }
}

module.exports = config;