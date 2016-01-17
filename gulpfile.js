var gulp   = require('gulp'),
    watch  = require('gulp-watch'),
    rollup = require('gulp-rollup'),
    rollupString = require('rollup-plugin-string'),
    catchErrors = require('gulp-plumber');

var paths = {
    todo: {
        jsFiles: 'todo/app/**/*.js',
        htmlFiles: 'todo/app/**/*.html',
        entry: 'todo/app/app.js',
        dest: 'todo/bundle'
    }
};

gulp.task('todo-dev', ['todo-build'], function () {
    watch([paths.todo.jsFiles, paths.todo.htmlFiles], function () {
        gulp.start('todo-build');
    });
});

gulp.task('todo-build', function () {
    gulp.src(paths.todo.entry, {read: false})
        .pipe(catchErrors())
        .pipe(rollup({
            format: 'iife',
            plugins: [rollupString({
                extensions: ['.html']
            })]
        }))
        .pipe(gulp.dest(paths.todo.dest));
});
