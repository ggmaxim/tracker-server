"use strict";

const {mongo} = require("../resources/environment");

/*
Adds a location.
*/
async function addLocation (id, latitude, longitude) {
    const date = new Date(),
        location = {
            latitude,
            longitude,
            date: new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
            user_id: id,
        };

    try {
        await mongo.collection("locations").insertOne(location);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    addLocation,
}