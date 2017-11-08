var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
gulp.task('hello',function(){
	console.log('hello world!');
});
gulp.task('copy-index',function(){
	return gulp.src('index.html')
	.pipe(gulp.dest('page'))
	.pipe(connect.reload());
});
gulp.task('images',function(){
	return gulp.src('img/*.jpg').pipe(gulp.dest('page/images'))
});
/*gulp.task('data',function(){
	return gulp.src(['one/*.json','two/*.json']).pipe(gulp.dest('page/data'));
})*/
gulp.task('data',function(){
	return gulp.src(['one/*.json','two/*.json','!two/c.json']).pipe(gulp.dest('page/data'));
});
gulp.task('build',['copy-index','images','data'],function(){
	console.log('编译成功！！！');
});
//gulp.task('watch',function(){
//	gulp.watch('index.html',['copy-index']);
//	gulp.watch('img/**/*.{jpg,png}',['images']);
//	gulp.watch(['one/*.json','two/*.json','!two/c.json'],['data']);
//});
gulp.task('sass',function(){
	return gulp.src('css/index.scss')
	.pipe(sass())
	.pipe(gulp.dest('page/css'));
});
gulp.task('sever',function(){
	connect.server({root:'page'});
});
gulp.task('sever',function(){
	connect.server({
		root:'page',
		livereload:true
	});
});
gulp.task('watch',function(){
	gulp.watch('index.html',['copy-index']);
})
gulp.task('default',['sever','watch']);
gulp.task('scripts',function(){
	return gulp.src(['js/Ajax.js','js/jQuery.js'])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('page/js'));
});
gulp.task('scripts',function(){
	return gulp.src(['js/Ajax.js','js/jQuery.js'])
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(gulp.dest('page/js'));
});
gulp.task('scripts',function(){
	return gulp.src(['js/Ajax.js','js/jQuery.js'])
	.pipe(concat('vendor.js'))
	.pipe(uglify())
	.pipe(rename('vendor.min.js'))
	.pipe(gulp.dest('page/js'));
});
/*gulp.task('sass',function(){
	return gulp.src('style/test.scss')
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest('page/css'));
});*/
