export const queries = `
mediaDetails(id: Int!, type: String!): MediaDetails!
media(page: Int!): [Media!]!
mediasDetails(items: [VariousMediaDetails!]!): [MediaDetails!]!`;
