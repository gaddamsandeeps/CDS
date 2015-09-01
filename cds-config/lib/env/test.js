module.exports = {
    app: {
        description: "Testing environment is up..."
    },
    restUrl: {
        host: 'http://192.168.24.160:8081/cds-rest/api/v1/', // here only the domain name        
        //port: '443',        
        contentType: {
            "Content-Type": "application/json"
        }
    },
    image: {
        rootPath: "./public/images/",
        path: "profile/"
    },
    attachments: {
        rootPath: "./public/images/",
        path: "attachments/"
    },
    db: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'cds'
    },
    logger: {
        logAppender: "file",
        logFilename: "/home/ositechuser/CDS/web/log/CDS.log",
        logCategory: "CDS",
        logLevel: "ERROR",
        maxLogSize: "75MB",
        backups: 10
    }

};
