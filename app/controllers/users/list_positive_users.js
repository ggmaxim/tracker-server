"use strict";

const {
        readPositiveUsers,
    } = require("../../helpers/users");

async function handler (request, reply) {
    const users = await readPositiveUsers();
    return {
        isSuccess: 1,
        users,
    };
}

module.exports = handler;