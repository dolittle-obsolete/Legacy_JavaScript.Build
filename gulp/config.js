/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import {GlobConfig} from "./GlobConfig";

let rootDir = process.cwd();
let outputDir = `${rootDir}/wwwroot`;
let sourceDir = `${rootDir}`;
let specsDir = `${rootDir}/Specifications`;

const _rootDir = new WeakMap();
const _outputDir = new WeakMap();
const _sourceDir = new WeakMap();
const _specsDir = new WeakMap();
const _dotnetProcessString = new WeakMap();

const _less = new WeakMap();
const _html = new WeakMap();
const _content = new WeakMap();


class config {
    constructor() {
        this.paths = new paths(this);
    }
}

class paths {
    constructor(config) {
        this.config = config;

        _less.set(this, new GlobConfig());
        _html.set(this, new GlobConfig());
        _content.set(this, new GlobConfig());
    }

    get csharp() {
        return [
            `${this.sourceDir}/**/*.cs`,
            `!${this.sourceDir}/**/bin/**/*`,
            `!${this.sourceDir}/**/obj/**/*`
        ];
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

    get html() {
        let html = _html.get(this);
        if( html.isEmpty ) {
            html.includes.add(`${this.rootDir}/**/*.html`);
            html.excludes.add(`${this.rootDir}/bin/**/*`);
            html.excludes.add(`${this.rootDir}/bower_components/**/*`);
            html.excludes.add(`${this.rootDir}/jspm_packages/**/*`);
            html.excludes.add(`${this.rootDir}/node_modules/**/*`);
            html.excludes.add(`${this.outputDir}/**/*`);
        }
        return html;
    }

    get less() {
        let less = _less.get(this);
        if( less.isEmpty ) {
            less.includes.add(`${this.rootDir}/styles/styles.less`);
            less.excludes.add(`${this.rootDir}/bower_components/**/*`);
            less.excludes.add(`${this.rootDir}/jspm_packages/**/*`);
            less.excludes.add(`${this.rootDir}/node_modules/**/*`);
            less.excludes.add(`${this.outputDir}/**/*`);
        }
        return less;
    }

    get content() {
        let content = _content.get(this);
        if( content.isEmpty ) {
            content.includes.add(`${this.rootDir}/jspm_packages/**/*`);
            content.includes.add(`${this.rootDir}/bower_components/bootstrap/dist/js/bootstrap.min.js`);
            content.includes.add(`${this.sourceDir}/jspm.config.js`);
            content.includes.add(`${this.rootDir}/**/*.jpg`);
            content.includes.add(`${this.rootDir}/**/*.jpeg`);
            content.includes.add(`${this.rootDir}/**/*.gif`);
            content.includes.add(`${this.rootDir}/**/*.png`)
            content.includes.add(`${this.rootDir}/scripts/*.js`);
            content.includes.add(`${this.rootDir}/fonts/**/*`);
            content.excludes.add(`!${this.rootDir}/node_modules/**/*`);
            content.excludes.add(`!${this.outputDir}/**/*`);
        }
        return content;
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