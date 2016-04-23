var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    less = require('gulp-less'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendfile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('dev', function() {
    server.listen(serverport);
    lrserver.listen(livereloadport);
    gulp.run('watch');
});

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
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//gulp.task('views', function() {
//    // Get our index.html
//    gulp.src('./index.html')
//        // And put it in the dist folder
//        .pipe(gulp.dest('dist/'));
//
//    // Any other view files from app/views
//    gulp.src('app/**/*')
//        // Will be put in the dist/views folder
//        .pipe(gulp.dest('dist/views/'));
//});

gulp.task('watch', ['lint', 'concat', 'less'], function() {
    gulp.watch(['app/*.js', 'app/**/*.js'],[
        'lint',
        'concat'
    ]);
    gulp.watch(['app/assets/*.less'],[
        'less'
    ]);
    //gulp.watch(['index.html', 'app/**/*.html'], [
    //    'views'
    //]);
});
