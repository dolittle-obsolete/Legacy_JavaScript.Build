/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import Stream from "stream";
import path from "path";

let rename = () => {
    let stream = new Stream.Transform({ objectMode: true });

    stream._transform = (originalFile, unused, callback) => {
        console.log("Transform : "+originalFile.path);
        let resolvedDirName = path.dirname(originalFile.path);

        let file = originalFile.clone({ contents: false });

        let sortedIncludes = config.paths.content.includes.all.sort((a,b) => b.length - a.length);
        sortedIncludes.every(p => {
            let wildcardIndex = p.indexOf('*');
            if (wildcardIndex >= 0) p = p.substr(0, wildcardIndex);

            if (p[p.length - 1] == path.sep) p = p.substr(0, p.length - 1);

            let resolved = path.resolve(p);
            if (resolvedDirName.indexOf(resolved) == 0) {
                let start = resolved.length;
                if( file.path.indexOf(path.sep) == 0 ) start++;
                let relativeFile =  originalFile.path.substr(start);
                let output = path.join(config.paths.outputDir,relativeFile); 
                file.path = output;
                 
                console.log("Renaming to : "+output);
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