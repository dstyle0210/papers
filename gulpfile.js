var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');

gulp.task('sass', function () {
    gulp.src('./src/sass/papers.scss')
        .pipe(sass().on('error', sass.logError)) // SCSS -> CSS
        .pipe(csso()) // CSS minify
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ["sass", "watch"]);