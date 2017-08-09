/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import config from "../config";

export function contentPipeline(stream) {
    stream.pipe(gulp.dest(config.paths.outputDir));
    return stream;
}

gulp.task("content", () => {
    var stream = gulp.src(config.paths.content.all,{base:config.paths.sourceDir});
    contentPipeline(stream);
    return stream;
});
