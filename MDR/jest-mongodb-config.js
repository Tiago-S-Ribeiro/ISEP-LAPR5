module.exports = {
    mongodbMemoryServerOptions: {
        instance: {
            dbName: 'jest'
        },
        binary: {
            version: '4.2.10',
            skipMD5: true
        },
        autoStart: false
    }
};