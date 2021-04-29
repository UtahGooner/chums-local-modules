/**
 *
 * @param {string|number} id - User ID
 * @param {string} Company
 * @param {string} ARDivisionNo
 * @param {string} CustomerNo
 * @returns {Promise<boolean>}
 */
export interface ValidateUserAccountProps {
    id: string | number;
    Company: string;
    ARDivisionNo: string;
    CustomerNo: string;
}
