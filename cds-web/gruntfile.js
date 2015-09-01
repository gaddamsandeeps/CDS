module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jsDir: 'public/js/',
        jsDistDir: 'public/dist/js/',
        cssDir: 'public/css/',
        scssDir: 'public/scss/',
        cssDistDir: 'public/dist/css/',
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
            js: {
                options: {
                    specs: 'test/*_spec.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['<%=jsDir%>*.js'],
                dest: '<%=jsDistDir%><%= pkg.name.toLowerCase() %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name.toLowerCase() %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
               files: [{
                  expand: true,
                  cwd: 'public/js/src',
                  src: ['**/*.js', "!templates/**/*.js" ],
                  dest: 'public/js/min'
              }]
            }
        },

        copy: {
            getProd: {
                files: [{
                     expand: true,
                    cwd: 'public/js/src/templates',
                    src: '**/*.js',
                    dest: 'public/js/min/templates',
                    flatten: true,
                    filter: 'isFile'
                }]
            }
        },
        /* ,
                cssmin: {
                    add_banner: {
                        options: {
                            banner: '/*! <%= pkg.name.toLowerCase() %> <%=grunt.template.today("dd-mm-yyyy") %> */
        /*
                   },
                   files: {
                       '<%=cssDistDir%><%= pkg.name.toLowerCase() %>.min.css': ['<%= concat.css.dest %>']
                   }
               }
           }, ***/
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    /* nested / compact/ compressed / expanded  */
                    trace: true,
                    debugInfo: false,
                    lineNumbers: true,
                    update: false,
                    sourcemap: "none"
                },
                files: [{
                    expand: true,
                    cwd: 'public/scss',
                    src: ['*.scss', '**/*.scss'],
                    dest: 'public/css',
                    ext: '.css'
                }]

            }
        },
        jshint: {
            all: ['gruntfile.js', 'config/**/*.js', 'app/**/*.js'],
            options: {
                "loopfunc": true,
                "shadow": true
            }
        },
       requirejs: {
           	compile:{
            options: {
                appDir:"public/js",
                baseUrl: './',
                dir :"public/build",
                removeCombined: true,
                findNestedDependencies: true,
                mainConfigFile: "public/js/requireConfig.js",
                skipDirOptimize :true,
                modules :[
                    {
                            name:"depModules/home/dep"
                    }
                   

                ]
            }
         }
        },
        ngtemplates:      {
		  app:            {
		    src:         ['public/views/common/header.html','public/views/common/footer.html'],
		    dest:         'public/js/templates/app-template.js',
		    options:      {
		      bootstrap:  function(module, script) {
		        return 'define(module, [], function() { return { init: ' + script + ' }; });';
		      },
		       htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
		    }
		  }
		},
        watch: {
            files: ['<%=jsDir%>*.js', '<%=scssDir%>/**/*.scss'],
            tasks: ['concat', 'uglify', 'sass']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask("optimize", ["requirejs"]);
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch']);


};
