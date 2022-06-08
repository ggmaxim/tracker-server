"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function userRouters (fastify, options) {
    const {prefix} = fastify,
        listUsers = require("../controllers/users/list_users");

    fastify
        .get("/", getRouteOptions(`${prefix}`, "GET"), listUsers);
}

module.exports = userRouters;
