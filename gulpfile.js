var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var gulpCopy = require('gulp-copy');

gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError)) // SCSS -> CSS
        .pipe(csso()) // CSS minify
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});
gulp.task('pagewatch', function () {
    gulp.watch('./sass/*.scss', ['pagesass']);
});
gulp.task('pagesass', function () {
    gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError)) // SCSS -> CSS
        .pipe(csso()) // CSS minify
        .pipe(gulp.dest('./'));
});
gulp.task('page', ["pagesass", "pagewatch"]);
gulp.task('default', ["sass", "watch"]);


gulp.task('distsass', function () {
    gulp.src('./src/sass/papers.scss')
        .pipe(sass().on('error', sass.logError)) // SCSS -> CSS
        .pipe(csso()) // CSS minify
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('distcopy', function () {
    gulp.src(['./src/**/*.{html,css,js}'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ["distcopy"]);