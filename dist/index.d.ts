import {getConnection, mysql2Pool} from "./mysql";
import {loadValidation, validateRole, validateUser} from "./validate-user";
import {getDBCompany, getSageCompany} from './utils';

export {
    mysql2Pool,
    mysql2Pool as pool,
    getConnection,
    validateUser,
    validateRole,
    loadValidation,
    getDBCompany,
    getSageCompany
};
