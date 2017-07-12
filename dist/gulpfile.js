'use strict';

/**
 * Created by orange on 2017/6/28.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
    return gulp.src('./js/demo.js').pipe(babel({
        presets: ['env']
    })).pipe(gulp.dest('dist'));
});
//# sourceMappingURL=gulpfile.js.map