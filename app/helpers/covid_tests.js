"use strict";

const {getMongo} = require("../resources/modules");

/*
Adds a COVID test.
*/
async function addTest (cnp, result) {
    const date = new Date.now(),
        test = {
            cnp,
            result,
            tested: date,
        };

    try {
        const db = await getMongo();
        await db.collection("covid_tests").insertOne(test);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/*
Reads a COVID test.
*/
async function readTests (cnp) {
    const query = {
        cnp,
    };

    try {
        const db = await getMongo(),
            cursor = await db.collection("covid_tests").find(query),
            tests = await cursor.toArray();

        return tests;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    addTest,
    readTests,
}