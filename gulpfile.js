var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    imageop = require('gulp-image-optimization'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

gulp.task('server', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['ng*', 'gulp*', 'public*']
    });
});

gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(minify())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch:sass', function() {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('js', function() {
    gulp.src(['src/ng/app.module.js', 'src/ng/**/*.js'])
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch:js', ['js'], function() {
    gulp.watch('src/ng/**/*.js', ['js']);
});

gulp.task('default', ['watch:sass', 'watch:js', 'server']);

gulp.task('images', function(cb) {
    gulp.src(['raw-img/**/*.png', 'raw-img/**/*.jpg', 'raw-img/**/*.gif', 'raw-img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/img')).on('end', cb).on('error', cb);
});
