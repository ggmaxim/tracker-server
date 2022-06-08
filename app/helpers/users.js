"use strict";

const {getMongo} = require("../resources/modules");

/*
Reads user from database.
*/
async function readUser (query) {
    try {
        const db = await getMongo(),
            user = await db.collection("users").findOne(query);
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function readUsers () {
    try {
        const db = await getMongo(),
            cursor = await db.collection("users").find({});
        
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

/*
Adds new user to database.
*/
async function addUser (username, email, password, role, cnp, full_name) {
    const user = {
        username,
        email,
        password,
        role,
        cnp,
        full_name,
    };

    try {
        const db = await getMongo();
        await db.collection("users").insertOne(user);

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    addUser,
    readUser,
    readUsers,
}