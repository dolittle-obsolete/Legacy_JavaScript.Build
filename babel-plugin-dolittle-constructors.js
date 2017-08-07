/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2008-2017 doLittle. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const constructors = "constructors";

module.exports = function ({ types: t }) {
    return {
        visitor: {
            Program(path) {
                
                const identifier = t.identifier(constructors);
                const importDefaultSpecifier = t.importDefaultSpecifier(identifier);
                const importDeclaration = t.importDeclaration([importDefaultSpecifier], t.stringLiteral(constructors));
                path.unshiftContainer("body", importDeclaration);
            },
            Class(path) {
                const { node } = path;

                let className = path.node.id.name;
                if( className.indexOf("Constructor") >= 0 ) return;

                var methods = path.node.body.body;
                path.node.body.body.forEach((content) => {
                    if (content.key.name == "constructor") {
                        if (content._constructorsSet) return;

                        content._constructorsSet = true;

                        content.body.body.push(
                            t.expressionStatement(
                                t.CallExpression(
                                    t.MemberExpression(
                                        t.identifier(constructors),
                                        t.identifier("handle")
                                    ),
                                    [
                                        t.thisExpression(),
                                        t.stringLiteral(className),
                                        t.identifier("arguments")
                                    ]
                                )
                            )
                        );
                    }
                });
            }
        }
    }
};