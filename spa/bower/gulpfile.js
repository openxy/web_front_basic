var gulp = require('gulp'),
    concat = require('gulp-concat'),    
    mainBowerFiles = require('gulp-main-bower-files'),
    uglify = require('gulp-uglify'),
    mergeStream =   require('merge-stream')

gulp.task('compress', function () {
  var  lib = gulp.src('./bower.json')
              .pipe(mainBowerFiles( ))             
  var main = gulp.src('./js/*.js') 
                        
  return mergeStream(lib,main)  
        .pipe(uglify())       
        .pipe(concat('app.js'))                         
        .pipe(gulp.dest('./dist'))    

});