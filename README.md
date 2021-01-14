# CHUMS Local API Modules

This is used on a variety of node.js server instance for standard tasks.

## Required Environment Variables
    DEBUG (optional)    - default: chums:*
    MYSQL_POOL_LIMIT    - default: 5
    MYSQL_SERVER
    MYSQL_USERNAME
    MYSQL_PASSWORD
    MYSQL_DB
    JWT_SECRET
    JWT_ISSUER

## Exports
### MySQL
    getConnection()     
        - uses mysql2 Promise to create a connection instance

    mysql2Pool({...config}) 
        - a mysql2 Promise Pool instances

    pool                    
        - alias to .mysql2Pool

### User Authentication
    validateUser(req, res, next)   
        - validates a user against the /api/user server instance
        - on Success populates res.locals.profile = {user, roles, accounts}
        - on Failure sends 401 Authorization Required 

    validateRole(validRoles = []) => (req, res, next) 
        - ensures a user has the require roles
        - on Failure sends 403 Not Authorized

    loadValidation(req)
        - if request has a valid signed JWT token:
            returns profile object {user, roles, accounts} 
        - loads user validation from /api/user
            requires req.cookies.PHPSESSID, Basic Auth credentials 
            returns profile object {user, roles, accounts}
    
### General Utils
    getCompany(company = '') 
        - return chums|bc from company code

    getSageCompany(company = '') 
        - returns CHI|BCS from company string
