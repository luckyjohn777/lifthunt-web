var gulp = require('gulp'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence');

gulp.task('less', function () {
    gulp.src('./assets/less/styles.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/assets/css/'))
});

gulp.task('lint', function() {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', function () {
    gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

gulp.task('concat', function () {
    gulp.src([
            './node_modules/angular/angular.js',
            './node_modules/angular-aria/angular-aria.js',
            './node_modules/angular-material/angular-material.js',
            './node_modules/angular-animate/angular-animate.js',
            './node_modules/angular-route/angular-route.min.js',
            './node_modules/angular-sanitize/angular-sanitize.min.js',
            './node_modules/angular-material-icons/angular-material-icons.js',
            './node_modules/angular-material-calendar/angular-material-calendar.js',
            'app/app.js',
            'app/*.js',
            'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browserify', function () {
    browserify('./app/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-js', function () {
    gulp.src('./app/**/*.js')
        .pipe(uglify({
            // inSourceMap:
            // outSourceMap: "app.js.map"
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('copy-bower-components', function () {
    gulp.src('./bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', function () {
    gulp.src(['./index.html', './app/**/*.html'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('connectDev', function () {
    connect.server({
        root: 'app/',
        port: 8888
    });
});

gulp.task('connectDist', function () {
    connect.server({
        root: 'dist/',
        port: 9999,
        livereload: true
    });
});

gulp.task('default',
    ['lint', 'connect']
);

gulp.task('build', function () {
    runSequence(
        ['clean'],
        ['lint', 'less', 'concat', 'copy-html-files', 'connectDist']
    );
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.js', './app/**/*.js'], [
        'lint',
        'concat'
    ]);
    gulp.watch(['./assets/less/styles.less'], [
        'less'
    ]);
    gulp.watch(['./index.html', './app/*.html', './app/**/*.html'], [
        'copy-html-files'
    ]);
});
