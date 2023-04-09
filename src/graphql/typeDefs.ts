import { Media } from "./Media";

const typeDefs = `#graphql
  ${Media.types}
  
  type Query {
    ${Media.queries}
  }

`;

export default typeDefs;
