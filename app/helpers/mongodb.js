"use strict";

const qs = require("querystring");

function getMongoString (config) {
    let connection = "mongodb://";

    connection += `${config.username}:${config.password}@`;

    const host_list = config.host.join(",");
    connection += `${host_list}/${config.db}`;

    if (config.options) {
        const options = qs.stringify(config.options);
        connection += `?${options}`;
    }

    return connection;
}

module.exports = {getMongoString};
