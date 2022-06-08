"use strict";

const {
        readUsers,
    } = require("../../helpers/users"),
    {
        OperationError,
    } = require("../../helpers/error");

async function handler (request, reply) {
    const users = await readUsers();
    return {
        isSuccess: 1,
        users
    };
}

module.exports = handler;