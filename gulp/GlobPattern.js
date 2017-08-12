/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import path from "path";
const _pattern = new WeakMap();
const _basePath = new WeakMap();
const _negated = new WeakMap();

/**
 * Represents a globbing pattern combined with a potential basePath
 */
export class GlobPattern {

    /**
     * Initializes anew instance of {GlobPattern}
     * @param {String} pattern The globbing pattern
     * @param {Boolean} negated Whether or not the expression is negated
     * @param {String} [basePath] The base path for the pattern - optional
     */
    constructor(pattern, negated, basePath) {
        _pattern.set(this, pattern);
        _negated.set(this, negated);
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

    /**
     * Get whether or not the pattern is negated
     * @returns {Boolean} true if it is negated, false if not
     */
    get negated() { return _negated.get(this); }

    /**
     * Get a combined version of the pattern with the base path + pattern
     * @returns {String}
     */
    get combined() { 
        let result = "";
        if( this.hasBasePath ) result = path.join(this.basePath, this.pattern);
        else result = this.pattern;
        if( this.negated ) result = `!${result}`;

        return result;
    }
}