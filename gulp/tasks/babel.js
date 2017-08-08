/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import babel from "gulp-babel";
import doLittleExtend from "../../babel-plugin-dolittle-extend";

export default () => {
    return babel({
            presets: ["es2015"],
            plugins: [
                doLittleExtend
            ],
            sourceMaps: true,
            //sourceRoot: "../"
            sourceMaps: "inline"
    });
};