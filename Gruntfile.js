var grunt = require( 'grunt' );

grunt.loadNpmTasks( 'grunt-contrib-compass' );
grunt.loadNpmTasks( 'grunt-contrib-watch' );

grunt.initConfig({

  compass: {
    dist: {
      options: {
        config: 'config.rb'
      }
    }
  },

  watch: {
    sass: {
      files: [
        'template/sass/**/*.scss',
      ],
      tasks: ['compass']
    }
  }

});

grunt.registerTask( 'build', ['compass'] );
grunt.registerTask( 'default', ['build'] );