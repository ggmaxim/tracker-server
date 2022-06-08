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
        result,
        type,
    } = request.body;
    const user = await readUser({cnp});

    if(!user) {
        throw new OperationError("User not found");
    }

    await addTest(cnp, result, type);
    return {"status": 0};
}

module.exports = handler;