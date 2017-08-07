/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import config from "../config";
import util from "gulp-util";
import less from "gulp-less";


export function lessPipeline(stream) {
    stream
        .pipe(less())
        .on("error", util.log)
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("less", () => {
    var stream = gulp.src(config.paths.less,{base:config.paths.sourceDir});
    lessPipeline(stream);
    return stream;
});
