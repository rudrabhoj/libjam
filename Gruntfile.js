module.exports = (grunt) => {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
        sourceMap: true,
        sourceMapIn: 'dist/libjam.js.map'
      },
      js: {
        files: {
          'dist/libjam.min.js': ['dist/libjam.js']
        }
      }
    },
    browserify: {
      dist: {
        options: {
           transform: [['babelify', {presets: ['es2015']}]],
           cacheFile: 'cache.db',
           browserifyOptions: {
            debug: true
          }
        },
        src: ['src/main.js'],
        dest: 'dist/libjam.js',
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          hostname: '*',
          onCreateServer: function(server, connect, options) {
            console.log("Listening on port 3000...");
          }
        }
      }
    },
    exorcise: {
      app: {
        options: {},
        files: {
          'dist/libjam.js.map':['dist/libjam.js'],
        }
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['browserify', 'exorcise', 'uglify'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-exorcise');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');



  grunt.registerTask('default', ['connect', 'browserify', 'exorcise', 'uglify', 'watch']);
}
