module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["src/css/*", "!src/css/fontawesome.min.css", "!src/css/solid.min.css", "!src/css/webfonts"]
            },
            prod: {
                src: ["build/**"]
            }
        },
        sass: {
            dev: {
                options: {
                    style: "expanded"
                },
                src: "src/sass/style.scss",
                dest: "src/css/style.css"
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 versions']
                },
                src: ["src/css/*.css", "!src/css/webfonts/*.css"]
            }
        },
        cssmin: {
            prod: {
                files: {
                    "build/css/style.min.css": "src/css/style.css"
                }
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 4
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: "src/img/",
                        src: "*",
                        dest: "build/img/"

                    }
                ]
            }
        },
        copy: {
            prod: {
                expand: true,
                cwd: 'src',
                src: ["index.html", "css/fontawesome.min.css", "css/solid.min.css", "css/webfonts/**", "css/fonts/**"],
                dest: 'build/',
            }
        },
        replace: {
            prod: {
                src: ["build/index.html"],
                overwrite: true,
                replacements: [
                    {from: 'app/main.js', to: 'scripts.min.js'},
                    {from: 'style.css', to: 'style.min.css'}
                ]
            },
            prodCss: {
                src: ["build/css/style.css"],
                overwrite: true,
                replacements: [
                    { from: '../components/fonts/', to: 'fonts/' }
                ]
            }
        },
        watch: {
            dev: {
                files: ["src/**/*"],
                tasks: ["dev"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask("dev", ["clean", "sass", "autoprefixer"]);
    grunt.registerTask("prod", ["cssmin", "imagemin", "copy", "replace"]);
    grunt.registerTask("default", "dev");
    grunt.registerTask("build", ["dev", "prod"]);

};