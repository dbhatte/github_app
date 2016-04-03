module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
       compass: {
       files: ['**/*.{scss,sass}'],
       tasks: ['compass:dev']
      },
      js: {
       files: ['**/*.js'],
        tasks: ['uglify']
      }
     },

     compass: {
        dev: {
            options: {              
                sassDir: ['app/scss'],
                cssDir: ['app/css'],
                environment: 'development'
            }
        },
        prod: {
            options: {              
                sassDir: ['app/scss'],
                cssDir: ['app/css'],
                environment: 'production'
            }
        },
      },

      uglify: {
       all: {
           files: {
               'app/js/min/main.min.js': [
               'app/bower_components/*.js', 
               'app/js/*.js'
               ]
           }
        },
      },
  });

  // Load the plugin that provides the "stylus" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Define the default task
  grunt.registerTask('default', ['compass:dev' , 'uglify' , 'watch']);
};