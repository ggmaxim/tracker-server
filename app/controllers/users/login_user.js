"use strict";

const {
        readUser,
    } = require("../../helpers/users"),
    {
        OperationError,
    } = require("../../helpers/error");

async function handler (request, reply) {
    const {
        email,
        password,
    } = request.body;

    const user = await readUser({email, password});

    if (user) {
        return {
            isSuccess: 1,
            message: "Login success",
            role: user.role,
            id: user._id,
        }
    }
    return {
        isSuccess: 0,
        message: "Wrong email or password",
        email,
    };
}

module.exports = handler;