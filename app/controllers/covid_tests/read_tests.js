"use strict";

const {
        readTests,
    } = require("../../helpers/covid_tests"),
    {
        OperationError,
    } = require("../../helpers/error");
const { readUser } = require("../../helpers/users");

async function handler (request, reply) {
    const {
        cnp,
    } = request.body;
    const user = await readUser({cnp});

    if(!user) {
        throw new OperationError("User not found");
    }

    const tests = await readTests(cnp);

    return tests;
}

module.exports = handler;