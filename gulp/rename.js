/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Stream from "stream";
import path from "path";
import config from "./config";

let rename = (globConfig) => {
    let stream = new Stream.Transform({ objectMode: true });

    stream._transform = (originalFile, unused, callback) => {
        //console.log("Transform : "+originalFile.path);
        let resolvedDirName = path.dirname(originalFile.path);

        let file = originalFile.clone({ contents: false });

        let sortedIncludes = globConfig.includes.all.sort((a,b) => b.combined.length - a.combined.length);

        sortedIncludes.every(p => {
            let pattern = p.combined;
            let wildcardIndex = pattern.indexOf('*');
            if (wildcardIndex >= 0) pattern = pattern.substr(0, wildcardIndex);

            if (pattern[pattern.length - 1] == path.sep) pattern = pattern.substr(0, pattern.length - 1);

            let resolved = path.resolve(pattern);
            if (resolved.indexOf(resolvedDirName) == 0) {
                let pathToUse = resolved;
                if( p.hasBasePath ) {
                    pathToUse = p.basePath;
                }

                let start = pathToUse.length;
                if( file.path.indexOf(path.sep) == 0 ) start++;
                let relativeFile =  originalFile.path.substr(start);
                let output = path.join(config.paths.outputDir,relativeFile); 
                file.path = output;
                 
                //console.log("Renaming to : "+output);
                //console.log("Using pattern : "+pattern);
                return 0;
            }
            return 1;
        });

        // Rename sourcemap if present
        if (file.sourceMap) {
            file.sourceMap.file = file.relative;
        }
        callback(null, file);
    };

    return stream;
};

export default rename;
