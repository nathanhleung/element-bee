const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

const paths = {
  sass: 'assets/**/*.scss',
  babel: 'assets/**/*.js',
};

gulp.task('sass', () => {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('babel', () => {
  return gulp.src(paths.babel)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('default', ['sass', 'babel']);

gulp.task('dev', ['default'], () => {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.babel, ['babel']);
});