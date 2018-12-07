/* eslint-env es6 */

const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const terser = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

const input = 'src/chart.js';
const banner = `/*!
 * @license
 * ${pkg.name}
 * ${pkg.homepage}
 * Version: ${pkg.version}
 *
 * Copyright ${new Date().getFullYear()} Chart.js Contributors
 * Released under the MIT license
 * https://github.com/chartjs/${pkg.name}/blob/master/LICENSE.md
 */`;

const configs = [

	// ESM builds
	// dist/Chart.esm.min.js
	// dist/Chart.esm.js
	{
		input: input,
		plugins: [
			resolve(),
			commonjs()
		],
		output: {
			name: 'Chart',
			file: 'dist/Chart.esm.js',
			banner: banner,
			format: 'esm',
			indent: false,
			globals: {
				moment: 'moment'
			}
		},
		external: [
			'moment'
		]
	},
	{
		input: input,
		plugins: [
			resolve(),
			commonjs(),
			terser({output: {comments: 'some'}})
		],
		output: {
			name: 'Chart',
			file: 'dist/Chart.esm.min.js',
			banner: banner,
			format: 'esm',
			indent: false,
			globals: {
				moment: 'moment'
			}
		},
		external: [
			'moment'
		]
	},

	// UMD builds (excluding moment)
	// dist/Chart.min.js
	// dist/Chart.js
	{
		input: input,
		plugins: [
			resolve(),
			commonjs()
		],
		output: {
			name: 'Chart',
			file: 'dist/Chart.js',
			banner: banner,
			format: 'umd',
			indent: false,
			globals: {
				moment: 'moment'
			}
		},
		external: [
			'moment'
		]
	},
	{
		input: input,
		plugins: [
			resolve(),
			commonjs(),
			terser({output: {comments: 'some'}})
		],
		output: {
			name: 'Chart',
			file: 'dist/Chart.min.js',
			banner: banner,
			format: 'umd',
			indent: false,
			globals: {
				moment: 'moment'
			}
		},
		external: [
			'moment'
		]
	},

	// UMD builds (including moment)
	// dist/Chart.bundle.min.js
	// dist/Chart.bundle.js
	{
		input: input,
		plugins: [
			resolve(),
			commonjs()
		],
		output: {
			name: 'Chart',
			file: 'dist/Chart.bundle.js',
			banner: banner,
			format: 'umd',
			indent: false
		}
	},
	{
		input: input,
		plugins: [
			resolve(),
			commonjs(),
			terser({output: {comments: 'some'}})
		],
		output: {
			name: 'Chart',
			file: 'dist/Chart.bundle.min.js',
			banner: banner,
			format: 'umd',
			indent: false
		}
	}
];

// NOTE(SB)
const formats = (process.env.FORMATS || 'esm+umd').split('+');
module.exports = configs.filter((config) => {
	return formats.indexOf(config.output.format) !== -1;
})
