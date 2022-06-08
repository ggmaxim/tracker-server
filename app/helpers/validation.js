"use strict";


const Ajv = require("ajv");

const options = {
        format: "full",
        coerceTypes: true,
        useDefaults: true,
    },
    ajv = new Ajv(options);

ajv.addSchema(require("../validation/users.json"));
ajv.addSchema(require("../validation/tests.json"));
ajv.addSchema(require("../validation/schema.json"));

function validatorCompiler ({schema}) {
    return ajv.compile(schema);
}

module.exports = {
    validatorCompiler,
};
