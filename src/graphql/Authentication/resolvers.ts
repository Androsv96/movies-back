import axios from "axios";
import { REATED_MOVIE, REATED_TVSHOW, User } from "../../utils/interfaces";

interface MutationCreateSessionArgs {
  requestToken: string;
}

interface QueryGetUserArgs {
  sessionId: string;
}

export const resolvers = {
  queries: {
    getRequestToken: () =>
      axios(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_KEY}`
      ).then((res) => res.data),

    getUser: async (_, args: QueryGetUserArgs) => {
      const accountDetails: User = await axios(
        `https://api.themoviedb.org/3/account?api_key=${process.env.API_KEY}&session_id=${args.sessionId}`
      ).then((res) => res.data);
      const getRatedMovies: REATED_MOVIE = await axios(
        `https://api.themoviedb.org/3/account/${accountDetails.id}/rated/movies?api_key=${process.env.API_KEY}&session_id=${args.sessionId}`
      ).then((res) => res.data);
      const getRatedTvShows: REATED_TVSHOW = await axios(
        `https://api.themoviedb.org/3/account/${accountDetails.id}/rated/tv?api_key=${process.env.API_KEY}&session_id=${args.sessionId}`
      ).then((res) => res.data);

      const ratedTVShows = getRatedTvShows.results.map((tvShow) => ({
        id: tvShow.id,
        rating: tvShow.rating,
      }));

      const ratedMovies = getRatedMovies.results.map((movie) => ({
        id: movie.id,
        rating: movie.rating,
      }));

      return {
        ...accountDetails,
        ratedMedia: [...ratedTVShows, ...ratedMovies],
      };
    },
  },
  mutations: {
    createSession: (_, args: MutationCreateSessionArgs) =>
      axios(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.API_KEY}`,
        { method: "POST", data: { request_token: args.requestToken } }
      ).then((res) => res.data),
  },
};
