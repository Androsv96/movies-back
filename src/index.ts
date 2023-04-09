import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as dotenv from "dotenv";

import { typeDefs, resolvers } from "./graphql";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const boostrap = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

boostrap();
