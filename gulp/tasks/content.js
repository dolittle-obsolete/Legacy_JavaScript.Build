/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import gulpDebug from "gulp-debug";
import util from "gulp-util";
import config from "../config";

export function contentPipeline(stream) {
    stream
        .on("error", util.log)
        .pipe(gulpDebug())
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("content", () => {
    var stream = gulp.src(config.paths.content.all,{base:config.paths.sourceDir});
    contentPipeline(stream);
    return stream;
});
