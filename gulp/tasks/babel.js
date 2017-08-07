/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import babel from "gulp-babel";

export default () => {
    return babel({
            presets: ["es2015"],
            plugins: [
                //"./../../babel-plugin-dolittle-constructors.js"
                //"/Users/einari/Projects/dolittle/Samples/Basic/Source/Web/babel-plugin-dolittle-extend.js"
                //"C:\\Projects\\dolittle\\Samples\\Basic\\Source\\Web\\babel-plugin-dolittle-extend.js"
            ],
            sourceMaps: true,
            //sourceRoot: "../"
            sourceMaps: "inline"
    });
};