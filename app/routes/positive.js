"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function posUserRouters (fastify, options) {
    const {prefix} = fastify,
        listUsers = require("../controllers/users/list_positive_users");

    fastify
        .get("/", getRouteOptions(`${prefix}`, "GET"), listUsers);
}

module.exports = posUserRouters;
