"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BdInMemoryConfig = void 0;
const sequelize_1 = require("sequelize");
const task_model_1 = require("../models/task.model");
const OPTIONS_DATA_BASE = {
    dialect: 'sqlite',
    storage: ':memory:'
};
class BdInMemoryConfig {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize(OPTIONS_DATA_BASE);
    }
    getSequelize() {
        if (!this.sequelize) {
            return new sequelize_1.Sequelize(OPTIONS_DATA_BASE);
        }
        return this.sequelize;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            task_model_1.TaskModel.initialize(this.getSequelize());
            yield this.getSequelize().sync({ force: true });
            console.log('Base de datos inicializada con modelos OK!');
        });
    }
}
exports.BdInMemoryConfig = BdInMemoryConfig;
