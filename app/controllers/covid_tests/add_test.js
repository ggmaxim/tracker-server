"use strict";

const {
    addTest,
    } = require("../../helpers/covid_tests"),
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

    await addTest(cnp, date, result, type);
    return {
        isSuccess: 1,
        message: "Add test succes",
    }
}

module.exports = handler;