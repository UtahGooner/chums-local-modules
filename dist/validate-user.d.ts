/**
 * Requests validation from CHUMS /api/user service
 * - On success populates res.locals.profile = {user, roles, accounts} and executes next()
 * - On failure sends status 401 {error: 401, status: 'StatusText'}
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next
 * @returns {Promise<void>}
 */
export function validateUser(req: any, res: any, next: Function): Promise<void>;
/**
 * Validates a user role, stored in res.locals.profile.roles
 *  - On success executes next()
 *  - On failure sends status 403 Forbidden, {error: 403, status: 'Forbidden'}
 * @param {String | [String]} validRoles - array of valid roles
 * @returns {function(*, *, *): (*|undefined)}
 */
export function validateRole(validRoles?: string | [string]): (arg0: any, arg1: any, arg2: any) => (any | undefined);
/**
 * Executes validation request
 *  - validates JWT token from Authorization header "Bearer asdasd...asd" (from a standalone/web app)
 *  - validates req.cookies.PHPSESSID (from a logged in user)
 *  - validates basic authentication (from a API user)
 * @param {Object} req - Express request object
 * @returns {Promise<{valid: boolean, profile: {roles: [], accounts: [], user}}|*>}
 */
export function loadValidation(req: any): Promise<{
    valid: boolean;
    profile: {
        roles: [];
        accounts: [];
        user;
    };
} | any>;
