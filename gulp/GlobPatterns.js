/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const _patterns = new WeakMap();
const _negated = new WeakMap();

export class GlobPatterns {
    /**
     * Initializes a new instance of GlobPatterns
     * @param {boolean} [negated] Indicates wether or not the patterns added should be prefixed with 
     * an exclamation (!) for negation; not include - optional, defaults to false.
     */
    constructor(negated) {
        _patterns.set(this, []);
        _negated.set(this, negated || false);
    }

    /**
     * Add a pattern
     * @param {string} pattern The pattern to add
     */
    add(pattern) {
        let negated = _negated.get(this);
        let patterns = _patterns.get(this);

        let handleString = (p) => (negated ? "!":"")+p;
        if( pattern instanceof Array ) pattern.forEach(p => patterns.push(handleString(p)));
        else patterns.push(handleString(pattern));
    }

    /**
     * Clear all the patterns
     */
    clear() {
        _patterns.set(this, []);
    }

    /**
     * Get all the glob patterns as {string}
     * @returns {String[]}
     */
    get all() {
        return [].concat(_patterns.get(this));
    }

    /**
     * Get whether or not there are patterns
     * @returns {Boolean} - true if empty, false if not
     */
    get isEmpty() {
        return _patterns.get(this).length == 0;
    }
}
