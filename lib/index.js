const {mysql2Pool, getConnection} = require('./mysql');
const {validateUser, validateRole, loadValidation} = require('./validate-user');
const {getDBCompany, getSageCompany, parseSQL} = require('./utils');
const { resultToExcelSheet, appendToSheet, buildWorkbook, tableToSheet} = require('./to-xlsx');


exports.mysql2Pool = mysql2Pool;
exports.pool = mysql2Pool;
exports.getConnection = getConnection;
exports.validateUser = validateUser;
exports.validateRole = validateRole;
exports.loadValidation = loadValidation;
exports.getDBCompany = getDBCompany;
exports.getSageCompany = getSageCompany;
exports.parseSQL = parseSQL;
exports.resultToExcelSheet = resultToExcelSheet;
exports.appendToSheet = appendToSheet;
exports.buildWorkbook = buildWorkbook;
exports.tableToSheet = tableToSheet;
