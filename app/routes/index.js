"use strict";

async function routes (fastify, options) {
    fastify
        .register(require("./login"), {prefix: "/login"})
        .register(require("./users"), {prefix: "/users"})
        .register(require("./locations"), {prefix: "/location"})
        .register(require("./covid_tests"), {prefix: "/tests"});
}

module.exports = {
    routes,
};
