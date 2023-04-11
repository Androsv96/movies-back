export const types = `
    type requestToken {
        request_token: String
        success: Boolean
        expires_at: String
    }

    type createSession {
        session_id: String
        success: Boolean
    }
`;
