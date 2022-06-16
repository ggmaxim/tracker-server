"use strict";

const {mongo} = require("../resources/environment");

/*
Adds a COVID test.
*/
async function addTest (cnp, date, result, type) {
    const [month, day, year] = date.split("/"),
        test = {
            cnp,
            result,
            tested: new Date(year, month - 1, day),
            type,
        };

    try {
        await mongo.collection("covid_tests").insertOne(test);
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
        const cursor = await mongo.collection("covid_tests").find(query),
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