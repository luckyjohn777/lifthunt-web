var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    less = require('gulp-less');

//Less task
gulp.task('less', function () {
    gulp.src('./assets/less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/assets/css/'))
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// concat
gulp.task('concat', function() {
    gulp.src([
        './node_modules/angular/angular.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-material/angular-material.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-material-icons/angular-material-icons.js',
        'app/app.js',
        'app/*.js',
        'app/**/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(['app/*.js', 'app/**/*.js'],[
        'lint',
        'concat'
    ]);
    gulp.watch(['app/assets/*.less'],[
        'less'
    ]);
});

gulp.task('default', ['less', 'concat', 'watch'])
