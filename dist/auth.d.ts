export function basicAuth(req: Object): {
    pass: string | null;
    user: string | null;
};
export function jwtToken(req: Object): {
    token: null | string;
};
