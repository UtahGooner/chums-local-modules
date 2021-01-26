/**
 *
 * @param {number} id - User ID
 * @param {string} Company
 * @param {string} ARDivisionNo
 * @param {string} CustomerNo
 * @returns {Promise<boolean>}
 */
export function validateUserAccount({
                                        id,
                                        Company,
                                        ARDivisionNo,
                                        CustomerNo
                                    }: { id: number | string, Company: string, ARDivisionNo: string, CustomerNo: string }): Promise<boolean>;
