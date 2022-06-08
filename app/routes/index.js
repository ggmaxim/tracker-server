"use strict";

async function routes (fastify, options) {
    fastify
        .register(require("./login"), {prefix: "/login"})
        .register(require("./register"), {prefix: "/register"})
        .register(require("./users"), {prefix: "/users"});
        // .register(require("./tests"), {prefix: "/tests"});
}

module.exports = {
    routes,
};
