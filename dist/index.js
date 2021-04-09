var _a = require('./mysql'), mysql2Pool = _a.mysql2Pool, getConnection = _a.getConnection;
var _b = require('./validate-user'), validateUser = _b.validateUser, validateRole = _b.validateRole, loadValidation = _b.loadValidation;
var _c = require('./utils'), getDBCompany = _c.getDBCompany, getSageCompany = _c.getSageCompany, parseSQL = _c.parseSQL;
var sendEmail = require('./mailer').sendEmail;
exports.mysql2Pool = mysql2Pool;
exports.pool = mysql2Pool;
exports.getConnection = getConnection;
exports.validateUser = validateUser;
exports.validateRole = validateRole;
exports.loadValidation = loadValidation;
exports.getDBCompany = getDBCompany;
exports.getSageCompany = getSageCompany;
exports.parseSQL = parseSQL;
exports.sendEmail = sendEmail;