module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env : {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod: {
                NODE_ENV : 'PRODUCTION'
            }
        },
        preprocess : {
            dev: {
                src : './src/index.html',
                dest : './src/index.html'
            },
            prod: {
                src : './dist/index.html',
                dest : './dist/index.html',
                options : {
                    context : {
                        name : '<%= pkg.name %>',
                        version : '<%= pkg.version %>',
                        now : '<%= now %>',
                        ver : '<%= ver %>'
                    }
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9000,
                    hostname: "localhost",

                    // Prevents Grunt to close just after the task (starting the server) completes
                    // This will be removed later as `watch` will take care of that
                    keepalive: true,
                    livereload: true,
                    open: {
                        target: 'http://localhost:9000/src', // target url to open
                        appName: 'Google Chrome', // name of the app that opens, ie: open, start, xdg-open
                    }
                }
            }

        },
        watch: {
            html: {
                files: ['src/assets/tmpl/**/*.html'],
                tasks: ['development']
            },
            sass: {
                files: ['src/assets/scss/**/*.scss'],
                tasks: ['sass']
            }
        },
        sass: {
            options: {
                compass: true
            },
            dist: {
                files: {
                    'src/assets/css/main.css': 'src/assets/scss/main.scss'
                }
            }
        },
        sprite:{
            all: {
                src: ['src/assets/images/**/*.png', 'src/assets/images/**/*.jpg', '!src/assets/images/dist/*.*',
                '!src/assets/images/backgrounds/*.*', '!src/assets/images/overlays/*.*'],
                dest: 'src/assets/images/dist/spritesheet.png',
                destCss: 'src/assets/scss/core/_sprites.scss',
                imgPath: '../images/dist/spritesheet.png'
            }
        },
        htmlbuild: {
            dev: {
                src: 'src/assets/tmpl/index.html',
                dest: 'src/',
                options: {
                    sections: {
                        layout: {
                            loading: 'src/assets/tmpl/partials/loading.html',
                            joke: 'src/assets/tmpl/partials/joke.html',
                            fancy: 'src/assets/tmpl/partials/fancy.html',
                            leaders: 'src/assets/tmpl/partials/leaders.html',
                            projects: 'src/assets/tmpl/partials/projects.html',
                            statistics: 'src/assets/tmpl/partials/statistics.html',
                            designs: 'src/assets/tmpl/partials/designs.html'
                        }
                    }
                }
            },

            prod: {
                src: 'src/assets/tmpl/index.html',
                dest: 'dist/',
                options: {
                    sections: {
                        layout: {
                            loading: 'src/assets/tmpl/partials/loading.html',
                            joke: 'src/assets/tmpl/partials/joke.html',
                            fancy: 'src/assets/tmpl/partials/fancy.html',
                            leaders: 'src/assets/tmpl/partials/leaders.html',
                            projects: 'src/assets/tmpl/partials/projects.html',
                            statistics: 'src/assets/tmpl/partials/statistics.html',
                            designs: 'src/assets/tmpl/partials/designs.html'
                        }
                    }
                }
            }
        },
        copy: {
            options: {
                reload: true
            },
            prod: {
                files: [
                    // {cwd: '.', src: 'src/assets/tmpl/index.html', dest: 'dist/index.html'},
                    {expand: true, cwd: 'src/assets/images', src: ['**'], dest: 'dist/assets/images/'},
                    {expand: true, cwd: 'src/assets/css', src: ['**'], dest: 'dist/assets/css/'},
                    {expand: true, cwd: 'src/assets/fonts', src: ['**'], dest: 'dist/assets/fonts/'}
                ]
            },
            dev: {
                files: [{cwd: '.', src: 'src/assets/tmpl/index.html', dest: 'src/index.html'}]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/assets/javascripts/<%= pkg.name %>.min.js': ['src/scripts/script.js']
                }
            }
        }
    });

grunt.loadNpmTasks('grunt-env');
grunt.loadNpmTasks('grunt-html-build');
grunt.loadNpmTasks('grunt-preprocess');
grunt.loadNpmTasks('grunt-spritesmith');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-connect');

grunt.registerTask('development', ['env:dev', 'htmlbuild:dev', 'preprocess:dev', 'sprite', 'connect:dev', 'watch']);
grunt.registerTask('production', ['env:prod', 'htmlbuild:prod', 'preprocess:prod', 'uglify', 'copy:prod']);

};
