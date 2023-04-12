import { Media } from "./Media";
import { Authentication } from "./Authentication";

const typeDefs = `#graphql
  ${Media.types}
  ${Authentication.types}
  
  type Query {
    ${Media.queries}
    ${Authentication.queries}
  }

  type Mutation {
    ${Authentication.mutations}
    ${Media.mutations}
  }

`;

export default typeDefs;
