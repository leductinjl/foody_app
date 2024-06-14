const authHeader = (token: string | undefined) => ({ Authorization: `Bearer ${token || ''}` });

export { authHeader };
