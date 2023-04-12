import { Media } from "./Media";
import { Authentication } from "./Authentication";

const resolvers = {
  Query: {
    ...Media.resolvers.queries,
    ...Authentication.resolvers.queries,
  },
  Mutation: {
    ...Authentication.resolvers.mutations,
    ...Media.resolvers.mutations,
  },
};

export default resolvers;
