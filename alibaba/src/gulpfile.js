var	gulp=require('gulp');//引入
var	html=require('gulp-minify-html');//引入html压缩插件
var	sass=require('gulp-sass');//引入sass编译插件
var	css=require('gulp-minify-css');//引用css压缩插件
var	concat=require('gulp-concat')//引入合并插件
var	rename=require('gulp-rename')//引入重命名插件
var	reporter=require('gulp-jshint-html-reporter');//引入语法错误报告插件
var	imagemin=require('gulp-imagemin');//引入图片压缩插件
var	babel=require('gulp-babel');
var	preset=require('babel-preset-es2015');//引入ES6转ES5
var	core=require('babel-core');
var	connect=require('gulp-connect');//引入自刷新插件
/*gulp.task('default',function(){
	console.log('xuedalaoniubi,wansuiwansuiwanwansui');
});*/

//复制文件
gulp.task('usename',function(){
	gulp.src('index.html')
	.pipe(gulp.dest('../dist'));
})

//压缩html
gulp.task('yshtml',function(){
	gulp.src('html/*.html')
	.pipe(html())
	.pipe(gulp.dest('../dist/html/'));
});

//监听html
gulp.task('watchhtml',function(){
	gulp.watch('html/*.html',function(){
		gulp.run('yshtml');//执行对应的任务
	})
})

//编译sass
gulp.task('sass',function(){
	gulp.src('scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./css/'))
})

gulp.task('watchsass',function(){
	gulp.watch('scss/*.scss',function(){
			gulp.run('sass')
	})
})
//压缩css
gulp.task('yscss',function(){
	gulp.src('css/*.css')
	.pipe(css())
	.pipe(gulp.dest('../dist/css/'));
});

gulp.task('watchcss',function(){
	gulp.watch('css/*.css',function(){//监听
		gulp.run('yscss');
	})
})

//5.页面自刷新
gulp.task('connect',function(){
	connect.server({
		port:8888,
		livereload:true
	});
});

gulp.task('connecthtml',function(){
	gulp.src(['html/*.html','css/*.css'])
	.pipe(connect.reload());
})
gulp.task('connectwatch',function(){
	gulp.watch(['html/*.html','css/*.css'],['connecthtml'])
})

gulp.task('imagemin',function(){
	gulp.src('img/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest('../dist/img'))
})

gulp.task('default',['watchhtml','watchsass','watchcss','connect','connectwatch']);

