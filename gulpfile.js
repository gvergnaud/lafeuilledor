var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var less = require('gulp-less');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngmin= require('gulp-ngmin');


var PATH = {
    DIST: 'dist',
    LESS: 'styles/main.less',
    VENDORS: [
        'bower_components/countUp.js/countUp.min.js',
        'bower_components/gsap/src/minified/TweenMax.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js'
    ],
    SCRIPTS: [
        'app/**/*.js',
        'common/**/*.js',
    ]
};

function logError(err) {
    console.log(err);
}

gulp.task('less', function() {

    return gulp.src(PATH.LESS)
        .pipe(less().on('error', logError))
        .pipe(cssmin().on('error', logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(PATH.DIST));
});

gulp.task('vendors', function() {

    return gulp.src(PATH.VENDORS)
        .pipe(concat('vendors.js').on('error', logError))
        .pipe(uglify().on('error', logError))
        .pipe(rename({
            basename: 'vendors',
            suffix: '.min'
        }))
        .pipe(gulp.dest(PATH.DIST));

});

gulp.task('scripts', function() {

    return gulp.src(PATH.SCRIPTS)
        .pipe(concat('scripts.js').on('error', logError))
        .pipe(rename({
            basename: 'app',
            suffix: '.min'
        }))
        .pipe(gulp.dest(PATH.DIST));

});

gulp.task('build', ['less', 'vendors', 'scripts']);
