var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin');

gulp.task('deleteDistFoler', function() {
  return del("./dist");
});

gulp.task('optimizeImages', ['deleteDistFoler'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,  // this will further optimize jpeg
      interlaced: true,   // this will help our gif images
      multipass: true     // this will help our svg images
    }))
    .pipe(gulp.dest("./dist/assets/images"));
});

gulp.task('usemin', ['deleteDistFoler'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFoler', 'optimizeImages', 'usemin']);