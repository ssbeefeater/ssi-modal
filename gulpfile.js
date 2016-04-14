"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var closureCompiler = require('gulp-closure-compiler');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var gulpif = require('gulp-if');
var sprity = require('sprity');
var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        css: [
            './src/styles/*.css',
        ],
        ssi_modalJs: './src/ssi-modal/js/ssi-modal.js',
        ssi_modalSass: './src/ssi-modal/styles/ssi-modal.scss',
        ssi_modalImage: './src/ssi-modal/styles/images/**/*.{png,jpg}',
        ssi_modalImage2: './src/ssi-modal/styles/images/**/*.gif',
        dist: './dist'
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
        cssPath:'images/',
         processor: 'sass'// make sure you have installed sprity-sass
     })
     .pipe(gulpif('*.png', gulp.dest('./dist/ssi-modal/styles/images/'), gulp.dest('./src/ssi-modal/styles/')))
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

gulp.task('css', function () {
    gulp.src(config.paths.css)
     .pipe(concat('bundle.css'))
     .pipe(gulp.dest(config.paths.dist + '/css'))
     .pipe(browserSync.reload({stream:true}));
});
gulp.task('html', function () {
    gulp.src(config.paths.html)
     .pipe(gulp.dest(config.paths.dist))
     .pipe(browserSync.reload({stream:true}))
});
gulp.task('js', function () {
    gulp.src(config.paths.ssi_modalJs)
     .on('error', console.error.bind(console))
     .pipe(gulp.dest(config.paths.dist+'/ssi-modal/js'));
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

gulp.task('images', function () {
    gulp.src(config.paths.ssi_modalImage2)
        .pipe(gulp.dest(config.paths.dist + '/ssi-modal/styles/images'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.ssi_modalJs, ['js', 'compile']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.ssi_modalSass, ['sass']);
    gulp.watch(config.paths.images, ['images']);
    gulp.watch(config.paths.ssi_modalImage, ['sprites']);
});

gulp.task('default', ['compile','html','css', 'sass','sprites', 'images', 'js','browser-sync', 'watch']);