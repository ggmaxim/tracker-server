"use strict";

const {
        readUsers,
        readPositiveUsers,
        readContactUsers,
    } = require("../../helpers/users");

async function handler (request, reply) {
    const {
        role,
        positive,
        contacts,
    } = request.query;


    let query = {};
    if (role) {
        query = {role};
    }
    let users = [];
    if (positive) {
        users = await readPositiveUsers();
    } else if (contacts) {
        users = await readContactUsers();
    } else {
        users = await readUsers(query);
    }
    console.log(users);
    return {
        isSuccess: 1,
        users,
    };
}

module.exports = handler;