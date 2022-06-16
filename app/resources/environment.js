"use strict";

const {getMongoString}    = require("../helpers/mongodb"),
    {MongoClient}       = require("mongodb"),
    config              = require("./config");

const environment = {};

async function getMongo () {
    const mongo_config = config.ed_mongo;
    const name = "ed_mongo"
    console.log("mongo init");

    const connection_string = getMongoString(mongo_config),
        options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        mongo = await MongoClient.connect(connection_string, options),
        db = mongo.db(mongo_config.db);
    console.log("connected to mongo");
    db.name = name;
    environment.mongo = db;
}

async function initEnvironment () {
    await getMongo();
}

environment.config = config;
environment.initEnvironment = initEnvironment;

module.exports = environment;
