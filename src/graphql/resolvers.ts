import { Media } from "./Media";

const resolvers = {
  Query: {
    ...Media.resolvers.queries,
  },
};

export default resolvers;
