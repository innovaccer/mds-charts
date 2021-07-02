const postcss = require('gulp-postcss');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat');
const postcssColorMod = require('postcss-color-mod-function');
const cleaner = require('gulp-clean');

const sources = [
  './src/core/*.css',
  './src/components/*.css'
];

function clean () {
  return gulp
    .src('./dist/*', { allowEmpty: true })
    .pipe(cleaner());
}

function css() {
  return gulp
    .src(sources)
    .pipe(concat('index.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss([postcssColorMod()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
}


exports.build = gulp.series(clean, css);

exports.clean = clean;

gulp.task('watch', () => {
  gulp.watch(sources, gulp.series(css))
});