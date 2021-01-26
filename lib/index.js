const {mysql2Pool, getConnection} = require('./mysql');
const {validateUser, validateRole, loadValidation} = require('./validate-user');
const {getDBCompany, getSageCompany} = require('./utils');

exports.mysql2Pool = mysql2Pool;
exports.pool = mysql2Pool;
exports.getConnection = getConnection;
exports.validateUser = validateUser;
exports.validateRole = validateRole;
exports.loadValidation = loadValidation;
exports.getDBCompany = getDBCompany;
exports.getSageCompany = getSageCompany;
