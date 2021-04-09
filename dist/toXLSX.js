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
exports.buildXLSXHeaders = exports.buildWorkBook = exports.resultToExcelSheet = void 0;
var debug_1 = require("debug");
var debug = debug_1["default"]('chums:local-modules:toXLSX');
var xlsx_1 = require("xlsx");
function resultToExcelSheet(data, columnNames, onlyColumnNames) {
    var rows = [];
    var fields = [];
    var columns = [];
    if (onlyColumnNames) {
        fields = Object.keys(columnNames);
        columns = __spreadArray([], fields);
        if (data.length) {
            fields.forEach(function (field) {
                if (data[0][field] === undefined) {
                    debug('resultToExcelSheet()', "field '" + field + "' does not exist in data.");
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
    return xlsx_1.utils.aoa_to_sheet(rows);
}
exports.resultToExcelSheet = resultToExcelSheet;
function buildWorkBook(sheets, options) {
    if (options === void 0) { options = {}; }
    var defaultOptions = {
        type: 'buffer',
        cellDates: false,
        bookSST: true,
        bookType: 'xlsx',
        sheet: '',
        compression: true
    };
    var sheetNames = Object.keys(sheets);
    return xlsx_1.write({ SheetNames: sheetNames, Sheets: sheets }, __assign(__assign({}, defaultOptions), options));
}
exports.buildWorkBook = buildWorkBook;
function buildXLSXHeaders(filename) {
    return {
        'Content-disposition': "attachment; filename=" + filename,
        'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    };
}
exports.buildXLSXHeaders = buildXLSXHeaders;
