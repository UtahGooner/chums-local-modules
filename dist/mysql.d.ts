export const mysql2Pool: mysql2.Pool;
export function getConnection(): Promise<mysql2.Connection>;
import mysql2 = require("mysql2/promise");
