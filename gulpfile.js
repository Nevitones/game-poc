var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync').create(),
    lessPath = './resources/less/**/*.less';

gulp.task('less', function() {
    return gulp.src(lessPath)
        .pipe(less({
            paths: ['./resources/less']
        }))
        .pipe(gulp.dest('./resources/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['less', 'browser-sync'], function() {
    gulp.watch(lessPath, ['less'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
