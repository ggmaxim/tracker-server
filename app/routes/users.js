"use strict";

const {getRouteOptions} = require("../helpers/routes");

async function userRouters (fastify, options) {
    const {prefix} = fastify,
        listUsers = require("../controllers/users/list_users"),
        registerUser = require("../controllers/users/register_user"),
        deleteUser = require("../controllers/users/delete_user"),
        updateUser = require("../controllers/users/update_user");

    fastify
        .post("/", getRouteOptions(`${prefix}`, "POST"), registerUser)
        .delete("/:user_id", getRouteOptions(`${prefix}/:user_id`, "DELETE"), deleteUser)
        .patch("/:user_id", getRouteOptions(`${prefix}/:user_id`, "PATCH"), updateUser)
        .get("/", getRouteOptions(`${prefix}`, "GET"), listUsers);
}

module.exports = userRouters;
