({
    baseUrl: "./",
    appDir: "public/js",
    dir: "public/dist",
    removeCombined: true,
    findNestedDependencies: true,
    skipDirOptimize :false,
    mainConfigFile: "public/js/requireConfig.js",
    modules: [
        {
            name: "configHome",
            exclude:["lib/jquery"]
        },
        {
            name: "configSignin",
            exclude:["lib/jquery"]
        },
         {
            name: "configDashboard",
            exclude:["lib/jquery","lib/angular"]
        },
                 {
            name: "configRegister",
            exclude:["lib/jquery","lib/angular"]
        },
                 {
            name: "configProfile",
            exclude:["lib/jquery","lib/angular"]
        },
                 {
            name: "configTasks",
            exclude:["lib/jquery","lib/angular"]
        }
    ]
})