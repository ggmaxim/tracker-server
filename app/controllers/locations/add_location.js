"use strict";

const {
        addLocation,
    } = require("../../helpers/locations"),
    mongodb = require('mongodb'),
    {
        OperationError,
    } = require("../../helpers/error");
const { readUser } = require("../../helpers/users");

async function handler (request, reply) {
    const {
        id,
        latitude, 
        longitude,
    } = request.body;
    const user = await readUser({_id: mongodb.ObjectID(id)});

    if(!user) {
        return {
            isSuccess: 0,
            message: "User not found",
        }
    }

    await addLocation(id, latitude, longitude);
    return {
        isSuccess: 1,
        message: "Add location succes",
    }
}

module.exports = handler;