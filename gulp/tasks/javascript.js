/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import gulpDebug from "gulp-debug";
import sourcemaps from "gulp-sourcemaps";
import config from "../config";
import babel from "./babel";
import rename from "../rename";

export function javaScriptPipeline(stream) {
    stream
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on("error", (error) => {
            console.error("**** Babel compile error ****");
            console.log(error.fileName);
            console.log(error.message);
            console.log(error.codeFrame);
        })
        .pipe(sourcemaps.write(".", {
            mapSources: (sourcePath, file) => {
                return `../${sourcePath}`;
            }
            //sourceRoot: "../"
        }))
        .pipe(rename(config.paths.html))
        .pipe(gulpDebug())
        .pipe(gulp.dest(config.paths.outputDir));

    return stream;
}

gulp.task("javascript", () => {
    var stream = gulp.src(config.paths.javascript.allCombined, { base: config.paths.sourceDir })
    javaScriptPipeline(stream);
    return stream;
});
