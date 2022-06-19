"use strict";

const {
        addTest,
    } = require("../../helpers/covid_tests"),
    {
        readContactUsers,
    } = require("../../helpers/users"),
    {
        OperationError,
    } = require("../../helpers/error");
const { readUser } = require("../../helpers/users");

async function handler (request, reply) {
    const {
        cnp,
        date, 
        result,
        type,
    } = request.body;
    const user = await readUser({cnp});

    if(!user) {
        return {
            isSuccess: 0,
            message: "User not found",
        }
    }

    await addTest(user._id, cnp, date, result, type);

    const contact_users = await readContactUsers(user._id);
    return {
        isSuccess: 1,
        message: "Add test succes",
    }
}

module.exports = handler;