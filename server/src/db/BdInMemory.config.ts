import {Sequelize} from "sequelize";
import {TaskModel} from "../models/task.model";
import {UserLoginModel} from "../models/userLogin.model";

const OPTIONS_DATA_BASE: any = {
    dialect: 'sqlite',
    storage: ':memory:'
}

export class BdInMemoryConfig {

    private sequelize: Sequelize;


    constructor() {
        this.sequelize = new Sequelize(OPTIONS_DATA_BASE );
    }

    public getSequelize(): Sequelize {
        if (!this.sequelize) {
            return new Sequelize(OPTIONS_DATA_BASE);
        }
        return this.sequelize;
    }

    public async init(): Promise<void> {
        TaskModel.initialize(this.getSequelize());
        UserLoginModel.initialize(this.getSequelize());
        await this.getSequelize().sync({ force: true });
        console.log('Base de datos inicializada con modelos OK!');
    }
}