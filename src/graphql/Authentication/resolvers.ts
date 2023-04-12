import { AuthenticationRepository } from "./repository";
import {
  MUTATION_CREATE_SESSION_ARGS,
  QUERY_GET_USER_ARGS,
} from "./interfaces";

const authenticationRepository = new AuthenticationRepository();

export const resolvers = {
  queries: {
    getRequestToken: () => authenticationRepository.getRequestToken(),

    getUser: (_, args: QUERY_GET_USER_ARGS) =>
      authenticationRepository.getuser(args),
  },
  mutations: {
    createSession: (_, args: MUTATION_CREATE_SESSION_ARGS) =>
      authenticationRepository.createSession(args),
  },
};
