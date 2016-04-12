"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var closureCompiler = require('gulp-closure-compiler');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulpif = require('gulp-if');
var foreach = require('gulp-foreach');
var sprity = require('sprity');
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        images: './src/images/**/*.{png,jpg}',
        css: [
            './src/styles/*.css',
            './node_modules/bootstrap/dist/css/bootstrap.min.css'
        ],
        html: './src/*.html',
        js: './src/scripts/**/*.js',
        ssi_modalJs: './src/ssi-modal/js/ssi-modal.js',
        ssi_modalSass: './src/ssi-modal/styles/ssi-modal.scss',
        ssi_modalImage: './src/ssi-modal/images/**/*.{png,jpg}',
        ssi_modalImage2: './src/ssi-modal/images/**/*.gif',
        dist: './dist',
        mainJs: './src/scripts/main.js'
    },
    sassOptions: {
        errLogToConsole: true,
        outputStyle: 'compressed'
    }
};
gulp.task('sprites', function () {
    return sprity.src({
         src: config.paths.ssi_modalImage,
         style: './sprite.scss',
         processor: 'sass'// make sure you have installed sprity-sass
     })
     .pipe(gulpif('*.png', gulp.dest('./dist/ssi-modal/images/'), gulp.dest('./src/ssi-modal/styles/')))
});
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: 9090
        }
    });
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('compile', function () {
        gulp.src(config.paths.ssi_modalJs)
              .pipe(sourcemaps.init())
              .pipe(closureCompiler({
                  compilerPath: './node_modules/google-closure-compiler/compiler.jar',
                  fileName:'ssi-modal.min.js',
                  compilerFlags: {
                      create_source_map: config.paths.dist+'/ssi-modal/js/ssi-modal.min.js.map'
                  }
              }))
              .pipe(sourcemaps.write('.'))
              .pipe(gulp.dest(config.paths.dist+'/ssi-modal/js/'));

});


gulp.task('js', function () {
    gulp.src(config.paths.ssi_modalJs)
     .on('error', console.error.bind(console))
     .pipe(gulp.dest(config.paths.dist+'/ssi-modal/js'));

    browserify(config.paths.mainJs)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(browserSync.reload({stream:true}));

});
gulp.task('sass', function () {
    gulp.src(config.paths.ssi_modalSass)
        .pipe(sourcemaps.init())
        .pipe(sass(config.sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.paths.dist + '/ssi-modal/styles'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('images2', function () {
    gulp.src(config.paths.ssi_modalImage2)
        .pipe(gulp.dest(config.paths.dist + '/ssi-modal/images'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.ssi_modalJs, ['js', 'compile']);
    gulp.watch(config.paths.css, ['css']);
    gulp.watch(config.paths.ssi_modalSass, ['sass']);
    gulp.watch(config.paths.images, ['images']);
    gulp.watch(config.paths.ssi_modalImage, ['sprites']);
    gulp.watch(config.paths.ssi_modalImage2, ['images2']);
});

gulp.task('default', ['html', 'compile', 'sass','sprites', 'images', 'images2', 'js','browser-sync', 'css', 'watch']);
