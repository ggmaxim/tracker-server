"use strict";

const {
        readUser,
        deleteUser,
    } = require("../../helpers/users"),
    mongodb = require("mongodb"),
    {
        OperationError,
    } = require("../../helpers/error");

async function handler (request, reply) {
    const {
            user_id,
        } = request.params;

    let user = await readUser({_id: mongodb.ObjectID(user_id)});

    if (!user) {
        return {
            isSuccess: 0,
            message: "User does not exist",
        };
    }
    
    await deleteUser(user_id);
    return {
        isSuccess: 1,
        message: "Delete success",
    };
}

module.exports = handler;