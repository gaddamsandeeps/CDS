module.exports = {
    app: {
        description: "Development environment is up..."
    },
    restUrl: {
        host: 'http://192.168.24.16:8081/cds-rest/api/v1/', // here only the domain name        
        //port: '443',        
        contentType: {
            "Content-Type": "application/json"
        }
    },
    image: {
        rootPath: "./public/images/",
        tempPath:"./public/images/temp/",
        path: "profile/"
    },
    attachments: {
        rootPath: "./public/images/",
        path: "attachments/",
        viewPath : "./images/"
    },
    db: {
        host: 'localhost', // Host name for database connection. 
        port: 3307, // Port number for database connection. 
        user: 'root', // Database user. 
        password: 'root', // Password for the above database user. 
        database: 'cds', // Database name. 
        checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds. 
        expiration: 86400000, // The maximum age of a valid session; milliseconds.
    },
    logger: {
        logAppender: "file",
        logFilename: "C:/temp/CDS.log",
        logCategory: "CDS",
        logLevel: "ERROR",
        maxLogSize: "75MB",
        backups: 10
    }

};
