var gulp 			= require('gulp'),
sass 					= require('gulp-sass'),
browserSync 	= require('browser-sync'),
concat        = require('gulp-concat'),
uglify  			= require('gulp-uglifyjs'),
cssnano       = require('gulp-cssnano'),   
rename        = require('gulp-rename'),
del           = require('del'),
imagemin      = require('gulp-imagemin'),
pngquant      = require('imagemin-pngquant'),
cache         = require('gulp-cache'),
autoprefixer  = require('gulp-autoprefixer');


gulp.task('sass', function() {
	return gulp.src('app/css/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true }))
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/jquery-2.1.3.min.js',
		'app/libs/magnific-popup/jquery.magnific-popup.min.js',
		'app/libs/html5shiv/es5-shim.min.js',
		'app/libs/html5shiv/html5shiv.min.js',
		'app/libs/html5shiv/html5shiv-printshiv.min.js',
		'app/libs/html5shiv/respond.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/scroll2id/PageScroll2id.min.js',
		'app/libs/mixitup/mixitup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
  browserSync({
  	server: {
  		baseDir: 'app'	
  	},
  	notify: false
  });
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clean', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
		})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync','css-libs', 'scripts'], function() {
	gulp.watch('app/css/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/libs.min.css',
		])
	 .pipe(gulp.dest('dist/css'));

	 var buidFonts = gulp.src('app/fonts/**/*')
	 .pipe(gulp.dest('dist/fonts'));

	 var buildJs = gulp.src('app/js/**/*')
	 .pipe(gulp.dest('dist/js'));

	 var buildHtml = gulp.src('app/*.html')
	 .pipe(gulp.dest('dist'));

});
