"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function registerRoutes (fastify, options) {
    const {prefix} = fastify,
        registerUser = require("../controllers/users/register_user");

    fastify
        .post("/", getRouteOptions(`${prefix}`, "POST"), registerUser);
}

module.exports = registerRoutes;
