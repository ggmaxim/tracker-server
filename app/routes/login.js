"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function loginRoutes (fastify, options) {
    const {prefix} = fastify,
        loginUser = require("../controllers/users/login_user");

    fastify
        .post("/", getRouteOptions(`${prefix}`, "POST"), loginUser);
}

module.exports = loginRoutes;
