'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rigger = require('gulp-rigger'),
    rimraf = require('rimraf'),
    liveServer = require("live-server"),
    browserSync = require('browser-sync').create();

var path = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/images/',
        fonts: 'build/assets/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/assets/js/main.js',
        jsLibs: 'src/assets/js/libs.js',
        style: 'src/assets/css/*.css',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/css/**/*.css',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    port: 8888, 
    host: "127.0.0.1",
    root: "build/", 
    open: false, 
    wait: 1000, 
    mount: []
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html)); 
});

gulp.task('js:buildLibs', function () {
    gulp.src(path.src.jsLibs)
        .pipe(rigger()) 
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});
gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)); 
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:buildLibs',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:buildLibs');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    liveServer.start(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build/"
        },
        //index: 'loyal_404.html'
        //index: 'loyal_about.html'
        //index: 'action.html'
        //index: 'loyal_articles.html'
        //index: 'catalog.html'
        //index: 'basket.html'
        //index: 'product.html'
        //index: 'carwash.html'
        //index: 'keeping.html'
        //index: 'loyal_comment.html'
        //index: 'loyal_comments.html'
        //index: 'loyal_news.html'
        //index: 'actions.html'
        //index: 'loyal_optovym сlientam.html'
        //index: 'loyal_sposoby oplaty.html'
        //index: 'loyal_udobnaya dostavka.html'
        //index: 'my-profile.html'
        //index: 'opt-sales.html'
        //index: 'order-form.html'
        //index: 'orders.html'
        //index: 'orders-history.html'
        //index: 'oshipovka.html'
        //index: 'poshiv-peretyajka.html'
        //index: 'registration-form.html'
        //index: 'tire-partners.html'
        //index: 'vopros.html'
        //index: 'popups.html'
        //index: 'pokupatelyam.html'
        //index: 'loyal_new article inside.html'
        //index: 'categories.html'
        //index: 'catalog-2.html'
        //index: 'catalog-1.html'
        //index: 'compare.html'
        //index: 'contacts.html'
        index: 'services.html'
        //index: 'sitemap.html'

    });
});

gulp.task('default', ['build', 'webserver', 'watch']);

