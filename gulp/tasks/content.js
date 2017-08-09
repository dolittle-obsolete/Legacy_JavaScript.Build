/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import gulpDebug from "gulp-debug";
import rename from "../rename";
import util from "gulp-util";
import config from "../config";

export function contentPipeline(stream) {
    console.log(`Output content to : ${config.paths.outputDir}`);
    stream
        .on("error", util.log)
        .pipe(rename(config.paths.content))
        .pipe(gulpDebug())
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("content", () => {
    var stream = gulp.src(config.paths.content.allCombined, { base: config.paths.sourceDir });
    contentPipeline(stream);
    return stream;
});
