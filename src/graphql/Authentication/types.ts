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

    type user {
        id: Int
        name: String
        username: String
        ratedMedia: [ratedMedia!]!
    }

    type ratedMedia {
        id: Int!
        rating: Float!
    }
`;
