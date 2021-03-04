import { WorkSheet, WritingOptions } from "xlsx";
export interface ColumnNames {
    [key: string]: string;
}
export interface WorkSheets {
    [key: string]: WorkSheet;
}
export declare function resultToExcelSheet(data?: any[], columnNames?: ColumnNames, onlyNamedColumns?: boolean): WorkSheet;
export declare function appendToSheet(sheet: WorkSheet, data?: any[], columnNames?: ColumnNames, onlyNamedColumns?: boolean): WorkSheet;
export declare function tableToSheet(table: any): WorkSheet;
export declare function buildWorkbook(sheets: WorkSheets, options?: WritingOptions): any;
