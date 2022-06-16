"use strict";

const {mongo} = require("../resources/environment");

/*
Reads user from database.
*/
async function readUser (query) {
    try {
        const user = await mongo.collection("users").findOne(query);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function readUsers (query) {
    try {
        const cursor = await mongo.collection("users").find(query);
        
        cursor.project({
            _id: 0,
            password: 0,
        });
        return cursor.toArray();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function readPositiveUsers () {
    try {
        const now = new Date();
        now.setDate(now.getDate() - 5);
        const aggregation = [
            {
                $lookup: {
                    from: "covid_tests",
                    let: {cnp: "$cnp"},
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$result", "pozitiv"] },
                                        { $eq: [ "$cnp", "$$cnp" ] },
                                        { $gt: ["$tested", now]}
                                    ]
                                }
                            }
                        }
                    ],
                    as: "tests"
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$tests", 0 ] }, "$$ROOT" ] } }
            },
            {
                $match: {
                    tests: {
                        $not: {$size: 0}
                    }
                }
             },
             {
                $project: { 
                    _id: 0,
                    password: 0,
                    tests: 0 
                }
            }
          ];
        const cursor = mongo.collection("users").aggregate(aggregation);
        
        return cursor.toArray();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/*
Adds new user to database.
*/
async function addUser (email, password, role, cnp, full_name) {
    const user = {
        email,
        password,
        role,
        cnp,
        full_name,
    };

    try {
        await mongo.collection("users").insertOne(user);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    addUser,
    readUser,
    readUsers,
    readPositiveUsers,
}