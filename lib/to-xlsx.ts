import {WorkSheet, WritingOptions, XLSX$Utils} from "xlsx";

const XLSX = require('xlsx');
const debug = require('debug')('chums:local-modules:to-xlsx');

export interface ColumnNames {
    [key:string]: string,
}

export interface WorkSheets {
    [key:string]: WorkSheet,
}

function prepResultsForSheet(data:any[] = [], columnNames:ColumnNames = {}, onlyNamedColumns:boolean = false):any[] {
    let rows = [];
    let fields = [];
    let columns = [];
    if (onlyNamedColumns) {
        fields = Object.keys(columnNames);
        columns = [...fields];
        if (data.length) {
            fields.forEach(field => {
                if (data[0][field] === undefined) {
                    debug('resultToExcelSheet()', `field '${field}' does not exist in data`);
                }
            })
        }
        rows = [
            columns.map(col => columnNames[col] || col),
            ...data.map(row => columns.map(col => row[col] || null)),
        ];
    } else {
        if (data.length) {
            fields = Object.keys(data[0]);
            columns = [...fields];
            rows = [
                columns.map(col => columnNames[col] || col),
                ...data.map(row => Object.values(row)),
            ]
        }
    }
    return rows;
}
export function resultToExcelSheet(data:any[] = [], columnNames:ColumnNames = {}, onlyNamedColumns:boolean = false):WorkSheet {
    const rows = prepResultsForSheet(data, columnNames, onlyNamedColumns);
    return XLSX.utils.aoa_to_sheet(rows);
}

export function appendToSheet(sheet:WorkSheet, data:any[] = [], columnNames:ColumnNames = {}, onlyNamedColumns:boolean = false):WorkSheet {
    const rows = prepResultsForSheet(data, columnNames, onlyNamedColumns);
    return XLSX.utils.sheet_add_aoa(sheet, rows, {origin: -1});
}

export function tableToSheet(table:any):WorkSheet {
    return XLSX.utils.table_to_sheet(table);
}

// export interface WorkB
const defaultWorkBookOptions:WritingOptions = {
    type: 'buffer',
    cellDates: false,
    bookSST: false,
    bookType: 'xlsx',
    sheet: '',
    compression: false,
}

export function buildWorkbook(sheets:WorkSheets, options:WritingOptions = {}) {
    const writeOptions = {
        ...defaultWorkBookOptions,
        ...options,
    }
    const SheetNames = Object.keys(sheets);

    return XLSX.write({SheetNames, Sheets: sheets}, writeOptions);
}
