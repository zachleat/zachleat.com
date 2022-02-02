/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Project configuration.
	grunt.initConfig({
		concat: {
			jsdist: {
				src: ['js/global.js'],
				dest: 'dist/toolordie.js'
			},
			cssdist: {
				src: ['css/global.css'],
				dest: 'dist/toolordie.css'
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/toolordie.min.js': ['dist/toolordie.js']
				}
			}
		},
		cssmin: {
			compress: {
				files: {
					'dist/toolordie.min.css': ['dist/toolordie.css']
				}
			}
		},
		watch: {
			dist: {
				files: ['js/*.js', 'css/*.js'],
				tasks: ['default']
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {}
		}
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'uglify']);

};
