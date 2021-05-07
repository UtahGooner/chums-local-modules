import {UserValidation} from "./types";

declare module "express" {
    export interface Request {
        userAuth?: UserValidation
    }
}

