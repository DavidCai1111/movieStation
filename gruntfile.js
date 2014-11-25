module.exports = function(grunt){

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }},
        nodemon: {
            dev: {
                script:'app.js',
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app','config'],
                    debug: true,
                    delayTime: 1,

                    cwd: __dirname
                }
            }
        },
        mochaTest:{
            options:{
                reporter:'spec'
            },
            src:['test/**/*.js']
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.option('force', true);

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('test', ['mochaTest']);
};

