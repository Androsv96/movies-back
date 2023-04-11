import axios from "axios";

interface MutationCreateSessionArgs {
  requestToken: string;
}

export const resolvers = {
  queries: {
    getRequestToken: () =>
      axios(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_KEY}`
      ).then((res) => res.data),
  },
  mutations: {
    createSession: (_, args: MutationCreateSessionArgs) =>
      axios(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_KEY}`,
        { method: "POST", data: { request_token: args.requestToken } }
      ).then((res) => res.data),
  },
};
