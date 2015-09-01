module.exports = {
    app: {
        description: "Production environment is up..."
    },
    restUrl: {
        host: 'http://10.10.10.58:8081/cds-rest/api/v1/', // here only the domain name        
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
        logFilename: "/soft/nodeserver/logs/CDS.log",
        logCategory: "CDS",
        logLevel: "ERROR",
        maxLogSize: "75MB",
        backups: 10
    }

};
