/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
module.exports = function ({ types: t }) {
    return {
        visitor: {
            Class(path) {
                const { node } = path;
                if (node.visited) return;
                node.visited = true;

                let className = path.node.id.name;
                let superClass = path.get("superClass");
                let superClassNode = null;
                if (superClass.node) {
                    console.log("superClass : " + superClass.node);
                    superClassNode = superClass.node;

                    /*
                    console.log(JSON.stringify(superClass.node));
                    if (superClass.node.type == "Identifier") {

                    } else {

                    }*/

                    superClass.remove();
                }

                if (!superClassNode) {
                    superClassNode = t.MemberExpression(
                        t.identifier("doLittle"),
                        t.identifier("Type")
                    );

                }

                var namespace = "Web";
                var filename = this.file.log.filename.substr(process.cwd().length);

                console.log("Filename : "+filename);

                var filePath = "";
                if (filename.lastIndexOf("/") > 0) {
                    filePath = filename.substr(0, filename.lastIndexOf("/"));
                    filePath = filePath.split("/").join(".");
                }

                if (filename.lastIndexOf("\\") > 0) {
                    filePath = filename.substr(0, filename.lastIndexOf("\\"));
                    filePath = filePath.split("\\").join(".");
                }

                if( filePath.indexOf(".") == 0 ) filePath = filePath.substr(1);
                namespace = "Web." + filePath;
                console.log("Namespace : "+namespace);

                var target = path;
                if (path.parentPath.node.type == "ExportNamedDeclaration") target = path.parentPath;


                var constructor = null;
                var properties = {};

                var methods = path.node.body.body;
                path.node.body.body.forEach((content) => {
                    if (content.key.name == "constructor") {
                        constructor = content;
                    }
                });

                if (constructor) {
                    var properties = {};

                    path.node.body.body.forEach((content) => {
                        if (content.key.name != "constructor") {
                            // Push before

                            if (content.kind == "get" || content.kind == "set") {
                                var property = {};
                                if (!properties.hasOwnProperty(content.key.name)) {
                                    properties[content.key.name] = property;
                                } else {
                                    property = properties[content.key.name];
                                }
                                property[content.kind] = content;
                            } else {

                                constructor.body.body.splice(0, 0,
                                    t.expressionStatement(
                                        t.AssignmentExpression(
                                            "=",
                                            t.MemberExpression(
                                                t.thisExpression(),
                                                t.identifier(content.key.name)
                                            ),
                                            t.FunctionExpression(
                                                t.identifier(""),
                                                content.params,
                                                content.body,
                                                content.generator,
                                                content.async
                                            )
                                        )
                                    )
                                );
                            }
                        }
                    });

                    for (var propertyName in properties) {
                        var property = properties[propertyName];

                        var accessors = [];
                        if (property.get) {
                            accessors.push(
                                t.ObjectProperty(
                                    t.identifier("get"),
                                    t.FunctionExpression(
                                        t.identifier(""),
                                        property.get.params,
                                        property.get.body,
                                        property.get.generator,
                                        property.get.async
                                    )
                                )
                            );
                        }

                        if (property.set) {
                            accessors.push(
                                t.ObjectProperty(
                                    t.identifier("set"),
                                    t.FunctionExpression(
                                        t.identifier(""),
                                        property.set.params,
                                        property.set.body,
                                        property.set.generator,
                                        property.set.async
                                    )
                                )
                            );
                        }



                        constructor.body.body.splice(0, 0,
                            t.expressionStatement(
                                t.CallExpression(
                                    t.MemberExpression(
                                        t.identifier("Object"),
                                        t.identifier("defineProperty")
                                    ),
                                    [
                                        t.thisExpression(),
                                        t.stringLiteral(propertyName),
                                        t.ObjectExpression(accessors)
                                    ]
                                )
                            )
                        )
                    }
                }

                // Todo: Remove any super() call
                // Todo: remove functions and properties from class - these are now setup in the constructor

                target.insertAfter(
                    t.expressionStatement(

                        t.CallExpression(
                            t.MemberExpression(t.identifier("doLittle"), t.identifier("namespace")),
                            [
                                t.stringLiteral(namespace),
                                t.ObjectExpression(
                                    [
                                        t.ObjectProperty(
                                            t.identifier(className),
                                            t.CallExpression(
                                                t.MemberExpression(
                                                    superClassNode,
                                                    t.identifier("extend")
                                                ),
                                                [
                                                    t.identifier(className)
                                                ]
                                            )
                                        )
                                    ]
                                )
                            ]
                        )
                    )
                )
            }
        }
    }
};

