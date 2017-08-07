/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
require("babel-register");        
var pipeline = require("./gulp/tasks/default").default;
var config = pipeline.config;                                                                                                                                                                                                                                                                          
config.paths.rootDir = __dirname;                                                                                                                                                                                                                                                                      
config.paths.outputDir = config.paths.rootDir+"/wwwroot";                                                                                                                                                                                                                                              
config.paths.sourceDir = config.paths.rootDir+"/Source";
config.paths.specsDir = config.paths.rootDir+"/Specifications";