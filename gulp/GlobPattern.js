/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const _pattern = new WeakMap();
const _basePath = new WeakMap();

/**
 * Represents a globbing pattern combined with a potential basePath
 */
export class GlobPattern {

    /**
     * Initializes anew instance of {GlobPattern}
     * @param {String} pattern The globbing pattern
     * @param {String} [basePath] The base path for the pattern - optional
     */
    constructor(pattern, basePath) {
        _pattern.set(this, pattern);
        _basePath.set(this, basePath||"");
    }

    /**
     * Get the globbing pattern
     * @returns {String} 
     */
    get pattern() { return _pattern.get(this); }

    /**
     * Get the base path for the pattern
     * @returns {String}
     */
    get basePath() { return _basePath.get(this); }

    /**
     * Get whether or not the pattern has a base path
     * @returns {Boolean} true if it has, false if not
     */
    get hasBasePath() { return this.basePath.length > 0; }
}