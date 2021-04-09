import { WorkSheet, WritingOptions } from 'xlsx';
import { RowDataPacket } from "mysql2";
export interface ColumnNames {
    [key: string]: string;
}
export interface WorkBookSheets {
    [key: string]: WorkSheet;
}
export declare function resultToExcelSheet(data: RowDataPacket[], columnNames: ColumnNames, onlyColumnNames: boolean): WorkSheet;
export declare function buildWorkBook(sheets: WorkBookSheets, options?: WritingOptions): any;
export declare function buildXLSXHeaders(filename: string): {
    'Content-Disposition': string;
    'Content-Type': string;
};
