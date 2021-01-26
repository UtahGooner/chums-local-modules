export function basicAuth(req: any): {
    pass: string | null;
    user: string | null;
};
export function jwtToken(req: any): {
    token: null | string;
};
