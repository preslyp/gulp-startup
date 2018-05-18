const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');
const buble = require('gulp-buble');




gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'})) // Converts Sass to CSS with gulp-sass
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 version']
      }))
      .pipe(concatCss('css/style.css'))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.reload({
        stream: true
      }))
});


gulp.task('scripts',function () {
  gulp.src('app/js/**/*.js')
  .pipe(concat('all.js'))
  .pipe(buble())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist',function () {
  gulp.src('app/js/**/*.js')
  .pipe(concat('all.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html',function () {
  gulp.src('app/index.html')
  .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images',function () {
  gulp.src('app/images/*')
  .pipe(gulp.dest('dist/img'));
});


gulp.task('watch', ['browserSync', 'sass', 'copy-images', 'copy-html', 'scripts', 'scripts-dist'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})