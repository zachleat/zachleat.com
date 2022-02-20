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
			' @license <%= pkg.license %> License */\n',
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
					'<%= config.jsSrc %>initial.js',
				],
				dest: '<%= config.distFolder %>initial.js'
			},
			jsAsync: {
				src: [
					'node_modules/fg-loadjs/loadJS.js',
					'<%= config.jsSrc %>timeago.js',
					'<%= config.jsSrc %>async.js'
					],
				dest: '<%= config.distFolder %>async.js'
			},
			jsDefer: {
				src: [
					'<%= config.jsSrc %>google-analytics.js',
					'<%= config.jsSrc %>lazyimg.js',
					'<%= config.jsSrc %>toggle.js',
					'node_modules/infinity-burger/infinity-burger.js',
					'node_modules/speedlify-score/speedlify-score.js',
					'node_modules/@zachleat/filter-container/filter-container.js',
					'node_modules/lite-youtube-embed/src/lite-yt-embed.js',
					],
				dest: '<%= config.distFolder %>defer.js'
			}
			// CSS concat handled by SASS
		},
		terser: {
			// TODO no banner
			options: {},
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
			options: {
				style: 'expanded',
				implementation: require("node-sass"),
				sourcemap: true
			},
			dist: {
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
					'web/css/lib/_infinity-burger.scss': 'node_modules/infinity-burger/infinity-burger.css',
					'web/css/lib/_speedlify-score.scss': 'node_modules/speedlify-score/speedlify-score.css',
					'web/css/lib/_lite-yt-embed.scss': 'node_modules/lite-youtube-embed/src/lite-yt-embed.css',
				}
			},
			// For CSS inlining
			includes: {
				files: {
					'_includes/initial.min.css': ['<%= config.distFolder %>initial.min.css'],
					'_includes/initial.css': ['<%= config.distFolder %>initial.css'],
					'_includes/initial.min.js': ['<%= config.distFolder %>initial.min.js'],
					'_includes/initial.js': ['<%= config.distFolder %>initial.js']
				}
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
						cwd: '_site/',
						src: '**/*.html',
						dest: '_site/'
					}
				]
			}
		},
		shell: {
			eleventyProduction: {
				command: 'npm run build-production',
				options: {
					execOptions: {}
				}
			},
		},
		clean: {
			drafts: [ '_site/web/drafts/**' ],
		}
	});

	// Default task.
	grunt.registerTask('assets', [
		'copy:css-to-sass',
		'sass',
		'concat',
		'terser',
		'cssmin'
	]);

	// no eleventy (for use with `npx grunt && npm start`)
	grunt.registerTask('default', [
		'clean',
		'assets',
		'copy:includes'
	]);

	// Upload to Production
	grunt.registerTask('production', [
		'default',
		'shell:eleventyProduction',
		'clean:drafts',
		'htmlmin'
	]);
};
