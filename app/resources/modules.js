"use strict";

const {getMongoString}    = require("../helpers/mongodb"),
    {MongoClient}       = require("mongodb"),
    config              = require("./config");

let cachedDb = null;

async function getMongo () {
    const mongo_config = config.ed_mongo;
    const name = "ed_mongo"
    console.log("mongo init");
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
        console.log('=> using cached database instance');
        return cachedDb;
    }

    const connection_string = getMongoString(mongo_config),
        options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        mongo = await MongoClient.connect(connection_string, options),
        db = mongo.db(mongo_config.db);
    console.log("connected to mongo");
    db.name = name;
    cachedDb = db;
    return cachedDb;
}

module.exports = {getMongo};
