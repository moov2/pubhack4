var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
        .pipe(sass({
			outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('../../css'));
});

gulp.task('autoprefixer', function() {
	return gulp.src('../css/styles.css')
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest('css'));
});
 
gulp.task('watch', function () {
	gulp.watch('sass/*.scss', ['sass']);
	gulp.watch('css/*.css', ['autoprefixer']);
});