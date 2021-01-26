import { mysql2Pool } from "./mysql";
import { getConnection } from "./mysql";
import { validateUser } from "./validate-user";
import { validateRole } from "./validate-user";
import { loadValidation } from "./validate-user";
export { mysql2Pool, mysql2Pool as pool, getConnection, validateUser, validateRole, loadValidation, getDBCompany, getSageCompany };