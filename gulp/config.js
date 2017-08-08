/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
let rootDir = process.cwd();
let outputDir = `${rootDir}/wwwroot`;
let sourceDir = `${rootDir}`;
let specsDir = `${rootDir}/Specifications`;

const _rootDir = new WeakMap();
const _outputDir = new WeakMap();
const _sourceDir = new WeakMap();
const _specsDir = new WeakMap();
const _dotnetProcessString = new WeakMap();

class config {
    constructor() {
        this.paths = new paths(this);
    }
}

class paths {
    constructor(config) {
        this.config = config;
    }

    get csharp() {
        return [
            `${this.sourceDir}/**/*.cs`,
            `!${this.sourceDir}/**/bin/**/*`,
            `!${this.sourceDir}/**/obj/**/*`
        ];
    }
    

    get html() {
        return [
            `${this.rootDir}/**/*.html`,
            `!${this.rootDir}/bin/**/*`,
            `!${this.rootDir}/bower_components/**/*`,
            `!${this.rootDir}/jspm_packages/**/*`,
            `!${this.rootDir}/node_modules/**/*`,
            `!${this.outputDir}/**/*`
        ]
    }

    get javascript() {
        return [
            `${this.sourceDir}/**/*.js`,
            `!${this.rootDir}/bower_components/**/*`,
            `!${this.rootDir}/bin/**/*`,
            `!${this.rootDir}/jspm_packages/**/*`,
            `!${this.rootDir}/node_modules/**/*`,
            `!${this.outputDir}/**/*`,
            `!${this.rootDir}/jspm.config.js`,
            `!${this.rootDir}/wallaby.js`,
            `!${this.rootDir}/config.js`,
            `!${this.rootDir}/gulpfile.js`,
            `!${this.rootDir}/gulp/**/*`
        ]
    }

    get javascriptSpecs() {
        return [
            `${this.specsDir}/**/*.js`
        ];
    }


    get less() {
        return [
            `${this.rootDir}/styles/styles.less`,
            `!${this.rootDir}/bower_components/**/*`,
            `!${this.rootDir}/jspm_packages/**/*`,
            `!${this.rootDir}/node_modules/**/*`,
            `!${this.outputDir}/**/*`
        ];
    }

    get content() {
        return [
            `${this.rootDir}/jspm_packages/**/*`,
            `${this.rootDir}/bower_components/bootstrap/dist/js/bootstrap.min.js`,
            `${this.sourceDir}/jspm.config.js`,
            `${this.rootDir}/**/*.jpg`,
            `${this.rootDir}/**/*.jpeg`,
            `${this.rootDir}/**/*.gif`,
            `${this.rootDir}/**/*.png`,
            `${this.rootDir}/scripts/*.js`,
            `${this.rootDir}/fonts/**/*`,
            `!${this.rootDir}/node_modules/**/*`,
            `!${this.outputDir}/**/*`
        ]
    }

    get rootDir() {
        if (_rootDir.has(this)) {
            return _rootDir.get(this);
        }
        return rootDir;
    }

    set rootDir(value) { _rootDir.set(this, value); }

    get outputDir() {
        if (_outputDir.has(this)) {
            return _outputDir.get(this);
        }
        return outputDir;
    }

    set outputDir(value) { _outputDir.set(this, value); }

    get sourceDir() {
        if (_sourceDir.has(this)) {
            return _sourceDir.get(this);
        }
        return sourceDir;
    }

    set sourceDir(value) { _sourceDir.set(this, value); }

    get specsDir() {
        if (_specsDir.has(this)) {
            return _specsDir.get(this);
        }
        return specsDir;
    }

    set specsDir(value) { _specsDir.set(this, value); }
    
    get dotnetProcessString() {
        if( _dotnetProcessString.has(this) ) {
            return _dotnetProcessString.get(this);
        }

        return "bin/Debug";
    }

    set dotnetProcessString(value) {
        _dotnetProcessString.set(this, value);
    }
}

export default new config();