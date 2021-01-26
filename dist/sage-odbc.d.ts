export = SageODBC;
declare class SageODBC {
    /**
     *
     * @param {string} company
     * @returns {Promise<SageODBC>}
     */
    static getConnection(company: string): Promise<SageODBC>;
    /**
     *
     * @param {string} query
     * @param {Object} [params]
     * @returns {string}
     */
    static sql(query: string, params?: any): string;
    /**
     * Returns an escaped value
     * @param {string} str
     * @returns {string}
     */
    static escape(str: string): string;
    /**
     *
     * @param {string} company
     */
    constructor(company: string);
    connection: any;
    /**
     *
     * @param {string} company
     */
    connect(company: string): void;
    /**
     *
     * @param {string} query
     * @param {Object} params
     * @returns {Promise<{records: *, sql: string}>}
     */
    query(query: string, params?: any): Promise<{
        records: any;
        sql: string;
    }>;
    schema(type: any, criteria: any, id: any): Promise<any>;
}
