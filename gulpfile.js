'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

$.util.log('Environment', $.util.colors.blue(gulp.env.production ? 'Production' : 'Development'));

var libs = [];

gulp.task('scripts', function () {
    return gulp.src('app/app.jsx')
        .pipe($.browserify({
            insertGlobals: true,
            transform: ['reactify', 'debowerify'],
            extensions: ['.jsx'],
            debug: !gulp.env.production
        }))
        .on('prebundle', function(bundle) {
            libs.forEach(function (lib) {
                bundle.external(lib);
            });
        })
        .pipe($.if(gulp.env.production, $.uglify({
            mangle: {
                except: ['require', 'export', '$super']
            }
        })))
        .pipe($.concat('app.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe($.size())
        .pipe($.connect.reload());
    });

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size())
        .pipe($.connect.reload());
});

gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

gulp.task('build', ['html', 'scripts', 'images', 'watch']);

gulp.task('default', ['build', 'connect']);

gulp.task('connect', $.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true,
    middleware: function(connect, opt) {
        return [
            function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                next();
            }
        ]
    }
}));

gulp.task('watch', function () {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/**/*.jsx', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
});