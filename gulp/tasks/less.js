/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import gulpDebug from "gulp-debug";
import config from "../config";
import util from "gulp-util";
import less from "gulp-less";
import rename from "../rename";

export function lessPipeline(stream) {
    console.log(`Output less to : ${config.paths.outputDir}`);
    stream
        .pipe(less())
        .on("error", util.log)
        .pipe(rename(config.paths.less))
        .pipe(gulpDebug())
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("less", () => {
    var stream = gulp.src(config.paths.less.allCombined,{base:config.paths.sourceDir});
    lessPipeline(stream);
    return stream;
});
