// @file config.js
var dest = './build'; // 出力先ディレクトリ
var src = './src';  // ソースディレクトリ

module.exports = {
// 出力先の指定
dest: dest,

// jsのビルド設定
js: {
	src: src + '/js/**',
	dest: dest + '/js',
	uglify: false
},

// webpackの設定
webpack: {
	entry: src + '/jampgame.js',
	output: {
	filename: 'bundle.js'
	},
	resolve: {
	extensions: ['', '.js']
	}
}
}