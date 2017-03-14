const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    nodemon = require('gulp-nodemon'),
    webpack = require('webpack'),
    path = require('path');

const pathFiles = {
    jsFiles: ['./public/js/**/*.js'],
    cssFiles: ['./public/css/*.css']
};

gulp.task('image', function() {
    gulp.src('./public/images/cloudinary/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/dist/images/cloudinary'));
});

gulp.task('css', function() {
    gulp.src('./public/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/dist/css'));

    gulp.src('./app/admin/partials/stylesheets/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./app/admin/partials/stylesheets/dist/css'));
});

gulp.task('js', function() {
    gulp.src(pathFiles.jsFiles)
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js'));

    gulp.src('./public/js/controllers/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist/js/controllers'));


    gulp.src('./app/admin/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./app/admin/dist'));

});


gulp.task('run', function() {
    nodemon({
            script: 'server.js',
            ext: 'js',
            env: {
                PORT: 2000,
                NODE_ENV: 'development'
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function() {
            console.log('changes acknowledged');
        });
});