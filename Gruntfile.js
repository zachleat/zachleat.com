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
			jsDeferModule: {
				src: [
					'node_modules/@11ty/is-land/is-land.js',
				],
				dest: '<%= config.distFolder %>defer-mod.js'
			},
			jsDefer: {
				src: [
					'<%= config.jsSrc %>google-analytics.js',
					'node_modules/@zachleat/filter-container/filter-container.js',
				],
				dest: '<%= config.distFolder %>defer.js'
			}
		},
		terser: {
			// TODO no banner
			options: {},
			js: {
				src: '<%= concat.js.dest %>',
				dest: '<%= config.distFolder %>initial.min.js'
			},
			jsDeferMod: {
				src: '<%= concat.jsDeferModule.dest %>',
				dest: '<%= config.distFolder %>defer-mod.min.js'
			},
			jsDefer: {
				src: '<%= concat.jsDefer.dest %>',
				dest: '<%= config.distFolder %>defer.min.js'
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
		'concat',
		'terser',
	]);

	// no eleventy (for use with `npx grunt && npm start`)
	grunt.registerTask('default', [
		'clean',
		'assets',
	]);

	// Upload to Production
	grunt.registerTask('production', [
		'default',
		'shell:eleventyProduction',
		'clean:drafts',
	]);
};
