"use strict";

const {
        readUsers,
    } = require("../../helpers/users");

async function handler (request, reply) {
    const {role} = request.query;
    let query = {};
    if (role) {
        query = {role};
    }
    const users = await readUsers(query);
    return {
        isSuccess: 1,
        users,
    };
}

module.exports = handler;