/**
 * Created by steve on 12/16/2016.
 */
"use strict";

const ADODB = require('node-adodb');
const namedPlaceholders = require('named-placeholders')();
const SqlString = require('sqlstring');
const debug = require('debug')('chums:local_modules:chums-base:sage-odbc');
const {getSageCompany} = require('./utils');


const connectionString = (company = 'CHI') => {
    company = getSageCompany(company);
    return `DSN=SAGE; Company=${company};`;
};

class SageODBC {
    // static adSchemaTables = 20;
    // static adSchemaColumns = 4;

    /**
     *
     * @param {string} company
     */
    constructor(company) {
        this.connection = null;
        if (company) {
            this.connect(company);
        }
    }

    /**
     *
     * @param {string} company
     */
    connect(company) {
        this.connection = ADODB.open(connectionString(company));
    }

    /**
     *
     * @param {string} company
     * @returns {Promise<SageODBC>}
     */
    static async getConnection(company) {
        try {
            return new SageODBC(company);
        } catch(err) {
            debug("getConnection()", err.message);
            return Promise.reject(err);
        }
    }

    /**
     *
     * @param {string} query
     * @param {Object} [params]
     * @returns {string}
     */
    static sql(query, params = {}) {
        const prepared = namedPlaceholders(query, params || {});
        return SqlString.format(prepared[0], prepared[1]);
    }

    /**
     *
     * @param {string} query
     * @param {Object} params
     * @returns {Promise<{records: *, sql: string}>}
     */
    async query(query, params = {}) {
        if (!this.connection) {
            return Promise.reject(new Error('SageODBC not connected.'));
        }
        const sql = SageODBC.sql(query, params);
        try {
            const records = await this.connection.query(sql);
            return {
                sql,
                records,
            };
        } catch(err) {
            debug("query()", err.message, sql);
            err.sql = sql;
            return Promise.reject(err);
        }
    }

    async schema(type, criteria, id) {
        return this.connection.schema(type, criteria, id);
    }

    /**
     * Returns an escaped value
     * @param {string} str
     * @returns {string}
     */
    static escape(str) {
        return SqlString.escape(str);
    }
}

module.exports = SageODBC;
