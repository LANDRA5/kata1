import {UserLoginModel} from "../models/userLogin.model";

export class LoginService {

    constructor() {
    }

    public async createUser(newUser: any) {
        console.log("LoginService::createUser", newUser);
        return UserLoginModel.create(newUser)
    }


    public async loginUser(userRequest: any) {
        console.log("LoginService::loginUser", userRequest);
        return UserLoginModel.findOne({ where: { user: userRequest.user, password: userRequest.password } });
    }
}