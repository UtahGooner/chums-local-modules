"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.buildWorkbook = exports.tableToSheet = exports.appendToSheet = exports.resultToExcelSheet = void 0;
var XLSX = require('xlsx');
var debug = require('debug')('chums:local-modules:to-xlsx');
function prepResultsForSheet(data, columnNames, onlyNamedColumns) {
    if (data === void 0) { data = []; }
    if (columnNames === void 0) { columnNames = {}; }
    if (onlyNamedColumns === void 0) { onlyNamedColumns = false; }
    var rows = [];
    var fields = [];
    var columns = [];
    if (onlyNamedColumns) {
        fields = Object.keys(columnNames);
        columns = __spreadArray([], fields);
        if (data.length) {
            fields.forEach(function (field) {
                if (data[0][field] === undefined) {
                    debug('resultToExcelSheet()', "field '" + field + "' does not exist in data");
                }
            });
        }
        rows = __spreadArray([
            columns.map(function (col) { return columnNames[col] || col; })
        ], data.map(function (row) { return columns.map(function (col) { return row[col] || null; }); }));
    }
    else {
        if (data.length) {
            fields = Object.keys(data[0]);
            columns = __spreadArray([], fields);
            rows = __spreadArray([
                columns.map(function (col) { return columnNames[col] || col; })
            ], data.map(function (row) { return Object.values(row); }));
        }
    }
    return rows;
}
function resultToExcelSheet(data, columnNames, onlyNamedColumns) {
    if (data === void 0) { data = []; }
    if (columnNames === void 0) { columnNames = {}; }
    if (onlyNamedColumns === void 0) { onlyNamedColumns = false; }
    var rows = prepResultsForSheet(data, columnNames, onlyNamedColumns);
    return XLSX.utils.aoa_to_sheet(rows);
}
exports.resultToExcelSheet = resultToExcelSheet;
function appendToSheet(sheet, data, columnNames, onlyNamedColumns) {
    if (data === void 0) { data = []; }
    if (columnNames === void 0) { columnNames = {}; }
    if (onlyNamedColumns === void 0) { onlyNamedColumns = false; }
    var rows = prepResultsForSheet(data, columnNames, onlyNamedColumns);
    return XLSX.utils.sheet_add_aoa(sheet, rows, { origin: -1 });
}
exports.appendToSheet = appendToSheet;
function tableToSheet(table) {
    return XLSX.utils.table_to_sheet(table);
}
exports.tableToSheet = tableToSheet;
// export interface WorkB
var defaultWorkBookOptions = {
    type: 'buffer',
    cellDates: false,
    bookSST: false,
    bookType: 'xlsx',
    sheet: '',
    compression: false
};
function buildWorkbook(sheets, options) {
    if (options === void 0) { options = {}; }
    var writeOptions = __assign(__assign({}, defaultWorkBookOptions), options);
    var SheetNames = Object.keys(sheets);
    return XLSX.write({ SheetNames: SheetNames, Sheets: sheets }, writeOptions);
}
exports.buildWorkbook = buildWorkbook;
