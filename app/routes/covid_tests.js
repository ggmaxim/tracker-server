"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function testsRoutes (fastify, options) {
    const {prefix} = fastify,
        addTest = require("../controllers/covid_tests/add_test"),
        getTests = require("../controllers/covid_tests/read_tests");

    fastify
        // .get("/", getRouteOptions(`${prefix}`, "GET"), getTests)
        .post("/", getRouteOptions(`${prefix}`, "POST"), addTest);
}

module.exports = testsRoutes;
