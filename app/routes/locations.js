"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function locationRoutes (fastify, options) {
    const {prefix} = fastify,
        addLocation = require("../controllers/locations/add_location");

    fastify
        .post("/", getRouteOptions(`${prefix}`, "POST"), addLocation);
}

module.exports = locationRoutes;
