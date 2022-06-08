"use strict";

const util = require("util");

const PROCESSING_ERROR = 100001;

class OperationError extends Error {
    constructor (message, error_code = PROCESSING_ERROR, data = {}) {
        super(message);
        this.data = data;
        this.status_code = 409;
        this.error_code = error_code;
    }

    [util.inspect.custom] () {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
            data: this.data,
            status_code: this.status_code,
            code: this.error_code,
        };
    }
}

module.exports = {
    OperationError,
};

