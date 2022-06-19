"use strict";

const {
        readUser,
        addUser,
    } = require("../../helpers/users"),
    {
        OperationError,
    } = require("../../helpers/error");

async function handler (request, reply) {
    const {
        email,
        role,
        cnp,
        full_name,
    } = request.body;
    let user = await readUser({cnp});
    if (user) {
        return {
            isSuccess: 0,
            message: "An account with this CNP is already registered.",
            email,
        };
    }
    user = await readUser({email});
    if (user) {
        return {
            isSuccess: 0,
            message: "An account with this email is already registered.",
            email,
        };
    }

    console.log(role);
    await addUser(email, role, cnp, full_name);
    return {
        isSuccess: 1,
        message: "Register success",
        email,
    };
}

module.exports = handler;