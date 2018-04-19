module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	require('time-grunt')(grunt);

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' <%= pkg.license %> License */\n',
		config: {
			root: 'web/', // from domain root, do not include the first slash, do include a trailing slash
			jsSrc: '<%= config.root %>js/',
			cssSrc: '<%= config.root %>css/',
			imgSrc: '<%= config.root %>img/',
			iconsSrc: '<%= config.imgSrc %>icons/',
			distFolder: '<%= config.root %>dist/<%= pkg.version %>/'
		},
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			js: {
				src: [
					// '<%= config.jsSrc %>reflow-log.js',
					'<%= config.jsSrc %>initial.js',
					'<%= config.jsSrc %>fonts.js'
				],
				dest: '<%= config.distFolder %>initial.js'
			},
			jsAsync: {
				src: [
					'node_modules/fontfaceonload/dist/fontfaceonload.js',
					'<%= config.jsSrc %>fonts-polyfill-fontfaceonload.js',
					'node_modules/fg-loadjs/loadJS.js',
					// 'node_modules/grunt-grunticon/example/output/grunticon.loader.js',
					'node_modules/fg-loadcss/src/loadCSS.js',
					'node_modules/fg-loadcss/src/onloadCSS.js',
					'<%= config.jsSrc %>grunticon-loader.js',
					'<%= config.jsSrc %>async.js'
					],
				dest: '<%= config.distFolder %>async.js'
			},
			jsDefer: {
				src: [
					'node_modules/infinity-burger/infinity-burger.js',
					'<%= config.jsSrc %>fontloademu.js',
					'<%= config.jsSrc %>google-analytics.js',
					'<%= config.jsSrc %>disqus.js',
					'<%= config.jsSrc %>twitter-api.js'
					],
				dest: '<%= config.distFolder %>defer.js'
			}
			// CSS concat handled by SASS
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			js: {
				src: '<%= concat.js.dest %>',
				dest: '<%= config.distFolder %>initial.min.js'
			},
			jsAsync: {
				src: '<%= concat.jsAsync.dest %>',
				dest: '<%= config.distFolder %>async.min.js'
			},
			jsDefer: {
				src: '<%= concat.jsDefer.dest %>',
				dest: '<%= config.distFolder %>defer.min.js'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: 'file'
				},
				files: {
					'<%= config.distFolder %>initial.css': '<%= config.cssSrc %>initial.scss',
					'<%= config.distFolder %>defer.css': '<%= config.cssSrc %>defer.scss',
					'<%= config.distFolder %>keynote-extractor.css': '<%= config.cssSrc %>keynote-extractor.scss'
				}
			}
		},
		cssmin: {
			dist: {
				options: {
					banner: '<%= banner %>'
				},
				files: {
					'<%= config.distFolder %>initial.min.css': ['<%= config.distFolder %>initial.css'],
					'<%= config.distFolder %>defer.min.css': ['<%= config.distFolder %>defer.css']
				}
			}
		},
		copy: {
			// Because sass won’t import css files
			'css-to-sass': {
				files: {
					'web/css/lib/_infinity-burger.scss': 'node_modules/infinity-burger/infinity-burger.css'
				}
			},
			// For CSS inlining
			includes: {
				files: {
					// Copy this into data since we’re running in /web/ and don’t have access to the package.json (it’s up a dir)
					'<%= config.root %>_data/package.json': ['package.json'],
					'<%= config.root %>_includes/initial.min.css': ['<%= config.distFolder %>initial.min.css'],
					'<%= config.root %>_includes/initial.css': ['<%= config.distFolder %>initial.css'],
					'<%= config.root %>_includes/initial.min.js': ['<%= config.distFolder %>initial.min.js'],
					'<%= config.root %>_includes/initial.js': ['<%= config.distFolder %>initial.js']
				}
			}
		},
		grunticon: {
			icons: {
				files: [{
					expand: true,
					cwd: "<%= config.iconsSrc %>",
					src: [ "*.svg" ],
					dest: "<%= config.distFolder %>icons/"
				}],
				options: {
					cssprefix: '.icon-',
					customselectors: {}
				}
			}
		},
		zopfli: {
			main: {
				options: {
					iteration: 15
				},
				files: [
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.html'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.html.zgz'
					},
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.js'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.js.zgz'
					},
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.css'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.css.zgz'
					},
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: ['**/*.svg'],
						dest: '<%= config.root %>_site/',
						extDot: 'last',
						ext: '.svg.zgz'
					}
				]
			}
		},
		htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= config.root %>_site/',
						src: '**/*.html',
						dest: '<%= config.root %>_site/'
					}
				]
			}
		},
		shell: {
			eleventy: {
				command: 'npx eleventy --quiet',
				options: {
					execOptions: {
						cwd: '<%= config.root %>'
					}
				}
			},
			// TODO https://github.com/shama/grunt-beep
			upload: {
				command: 'echo "Note: Requires an \'zachleat\' host in .ssh/config"; rsync --archive --verbose --stats --compress --rsh=ssh ./_site/ zachleat:/home/public/<%= config.root %>',
				options: {
					maxBuffer: 1024 * 1024 * 64,
					execOptions: {
						cwd: '<%= config.root %>'
					}
				}
			}
		},
		clean: {
			zopfli: [ '<%= config.root %>/_site/**/*.zgz' ]
		},
		watch: {
			assets: {
				files: ['<%= config.cssSrc %>**/*', '<%= config.jsSrc %>**/*'],
				tasks: ['assets', 'content']
			},
			grunticon: {
				files: ['<%= config.iconsSrc %>**/*'],
				tasks: ['grunticon', 'content']
			},
			content: {
				files: [
					'<%= config.root %>**/*.html',
					'<%= config.root %>**/*.md',
					'<%= config.root %>_includes/**/*',
					'!<%= config.root %>_site/*' ],
				tasks: ['content']
			}
		}
	});

	grunt.task.loadTasks('tasks');

	// Default task.
	grunt.registerTask('assets', ['copy:css-to-sass', 'sass', 'concat', 'uglify', 'cssmin']);
	grunt.registerTask('images', ['grunticon']);
	grunt.registerTask('content', ['copy:includes', 'shell:eleventy']);
	grunt.registerTask('default', ['clean', 'assets', 'images', 'content']);
	grunt.registerTask('separate', ['clean', 'assets', 'copy:includes']);

	// Upload to Production
	grunt.registerTask('stage', ['clean', 'assets', 'images', 'content', 'htmlmin', 'zopfli']);
	grunt.registerTask('deploy', ['stage', 'shell:upload', 'clean']);
};
