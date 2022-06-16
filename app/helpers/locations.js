"use strict";

const {mongo} = require("../resources/environment");

/*
Adds a location.
*/
async function addLocation (id, latitude, longitude) {
    const date = Date.now(),
        location = {
            latitude,
            longitude,
            date,
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