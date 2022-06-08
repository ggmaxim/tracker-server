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
        username,
        email,
        password,
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
    user = await readUser({username});
    if (user) {
        return {
            isSuccess: 0,
            message: "An account with this username is already registered.",
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

    // user = await readUser({phone});
    // if (user) {
    //     return {
    //         isSuccess: 0,
    //         message: "An account with this phone is already registered.",
    //         email,
    //     };
    // }
    await addUser(username, email, password, role, cnp, full_name);
    return {
        isSuccess: 1,
        message: "Register success",
        email,
    };
}

module.exports = handler;