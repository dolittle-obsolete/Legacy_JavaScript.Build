/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { GlobPattern } from "./GlobPattern";
import { GlobPatterns } from "./GlobPatterns";
const _includes = new WeakMap();
const _excludes = new WeakMap();

/**
 * Represents configuration for glob patterns
 */
export class GlobConfig {

    /**
     * Initializes a new instance of {GlobConfig}
     */
    constructor() {
        _includes.set(this, new GlobPatterns());
        _excludes.set(this, new GlobPatterns(true));
    }

    /**
     * Get the {GlobPatterns} for paths to include
     * @returns {GlobPatterns}
     */
    get includes() {
        return _includes.get(this);

    }

    /**
     * Get the {GlobPatterns} for paths to exclude
     * @returns {GlobPatterns}
     */
    get excludes() {
        return _excludes.get(this);
    }

    /**
     * Gets whether or not there are any patterns configured
     * @returns {Boolean} - true if empty, false if not
     */
    get isEmpty() {
        return this.includes.isEmpty && this.includes.isEmpty;
    }

    /**
     * Get all the {GlobPatterns} for paths to include and exclude - in that order
     * @returns {GlobPattern[]}
     */
    get all() {
        return this.includes.all.concat(this.excludes.all);
    }

    /**
     * Get all the patterns combined with the base path - if any
     * @returns {String[]}
     */
    get allCombined() {
        let patterns = [];
        let addPattern = (pattern) => patterns.push(pattern.combined);
        this.includes.all.forEach(addPattern);
        this.excludes.all.forEach(addPattern);
        return patterns;
    }
}