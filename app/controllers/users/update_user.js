"use strict";

const {
        readUser,
        updateUser,
    } = require("../../helpers/users"),
    mongodb = require("mongodb"),
    {
        OperationError,
    } = require("../../helpers/error");

async function handler (request, reply) {
    const {
        user_id,
    } = request.params,
    {
        email,
        role,
        cnp,
        full_name,
        password,
    } = request.body;
    console.log(user_id);
    let user = await readUser({_id: mongodb.ObjectID(user_id)});
    if (!user) {
        return {
            isSuccess: 0,
            message: "User not found.",
        };
    }
    
    await updateUser(user_id, email, role, cnp, full_name, password);
    return {
        isSuccess: 1,
        message: "Update success",
    };
}

module.exports = handler;