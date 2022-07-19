"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function testsRoutes (fastify, options) {
    const {prefix} = fastify,
        addTest = require("../controllers/covid_tests/add_test");

    fastify
        .post("/", getRouteOptions(`${prefix}`, "POST"), addTest);
}

module.exports = testsRoutes;
