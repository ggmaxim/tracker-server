/* istanbul ignore file */
"use strict";

const uuid  = require("uuid"),
    Fastify = require("fastify"),
    cors    = require("fastify-cors"),
    config  = require("./app/resources/config"),
    port    = config.port || 6000;


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

const fastify = Fastify(options);


fastify.register(cors, cors_options)
    .register(require('@fastify/formbody'))
    .register(routes, {prefix: "/v1"});

async function start(){
    await fastify.listen(port, "0.0.0.0");
}

start();