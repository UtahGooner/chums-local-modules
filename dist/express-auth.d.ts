import { UserValidation } from "./types";
declare module "express" {
    interface Request {
        userAuth?: UserValidation;
    }
}
