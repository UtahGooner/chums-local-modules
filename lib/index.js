const {mysql2Pool, getConnection} = require('./mysql');
const {validateUser, validateRole, loadValidation} = require('./validate-user');
const utils = require('./utils');

exports.mysql2Pool = mysql2Pool;
exports.pool = mysql2Pool;
exports.getConnection = getConnection;
exports.validateUser = validateUser;
exports.validateRole = validateRole;
exports.loadValidation = loadValidation;
exports.getCompany = utils.getCompany;
exports.getSageCompany = utils.getSageCompany;
