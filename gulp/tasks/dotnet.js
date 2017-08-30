/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import gulp from "gulp";
import start from "gulp-start-process";

export function dotnetPipeline(stream, cb) {
    start("dotnet watch run --no-restore", {setsid: true}, cb);
}

gulp.task("dotnet", cb => {
    dotnetPipeline(null, cb);
});

gulp.task("dotnetbuild", cb => {
    start("dotnet build", {setsid: true}, cb);
});