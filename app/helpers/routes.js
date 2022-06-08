"use strict";

const schema         = require("../validation/schema"),
    {validatorCompiler} = require("../helpers/validation") ;

function getRouteOptions (path, method) {
    const handler_schema = schema[method][path];

    if (typeof handler_schema === "undefined") {
        throw new Error(`Invalid schema for ${method}:${path}`);
    }

    const route_options = {
        validatorCompiler,
        schema: handler_schema,
    };

    return route_options;
}


module.exports = {
    getRouteOptions,
};
