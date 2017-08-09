/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import gulpDebug from "gulp-debug";
import util from "gulp-util";
import config from "../config";
import rename from "../rename";


export function htmlPipeline(stream) {
    console.log(`Output html to : ${config.paths.outputDir}`);
    stream
        .on("error", util.log)
        .pipe(rename(config.paths.html))        
        .pipe(gulpDebug())
        .pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("html", () => {
    var stream = gulp.src(config.paths.html.allCombined,{base:config.paths.sourceDir});
    htmlPipeline(stream);
    return stream;
});