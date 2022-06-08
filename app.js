/* istanbul ignore file */
"use strict";
const awsLambdaFastify = require('aws-lambda-fastify');
const uuid  = require("uuid"),
    Fastify = require("fastify"),
    cors    = require("fastify-cors"),
    {getMongo} = require("./app/resources/modules");

const options = {
    logger: {prettyPrint: true},
    genReqId: uuid.v4,
};

const cors_options = {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
};
const {routes} = require("./app/routes/index");

let db = null;

const fastify = Fastify(options);


fastify.register(cors, cors_options);
fastify.register(routes, {prefix: "/v1"});

async function handler (event, context) {
    if(!db){
        db = await getMongo();
    }
    context.callbackWaitForEmptyEventLoop = false;
    const proxy = awsLambdaFastify(fastify, {callbackWaitForEmptyEventLoop: false});
    return proxy(event, context);
}
module.exports = {handler};
