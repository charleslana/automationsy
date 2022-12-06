"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AutomationSyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AutomationSyError';
    }
}
exports.default = AutomationSyError;
