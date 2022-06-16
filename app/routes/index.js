"use strict";

async function routes (fastify, options) {
    fastify
        .register(require("./login"), {prefix: "/login"})
        .register(require("./register"), {prefix: "/register"})
        .register(require("./users"), {prefix: "/users"})
        .register(require("./positive"), {prefix: "/positive"})
        .register(require("./contact"), {prefix: "/contact"})
        .register(require("./locations"), {prefix: "/location"})
        .register(require("./covid_tests"), {prefix: "/tests"});
}

module.exports = {
    routes,
};
