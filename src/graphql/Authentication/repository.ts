import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { REATED_MOVIE, REATED_TVSHOW, User } from "../../utils/interfaces";
import {
  MUTATION_CREATE_SESSION_ARGS,
  QUERY_GET_USER_ARGS,
} from "./interfaces";

export class AuthenticationRepository {
  constructor() {}

  getRequestToken = () =>
    axios(
      `${BASE_API_URL}authentication/token/new?api_key=${process.env.API_KEY}`
    ).then((res) => res.data);

  getuser = async (args: QUERY_GET_USER_ARGS) => {
    const accountDetails: User = await axios(
      `${BASE_API_URL}account?api_key=${process.env.API_KEY}&session_id=${args.sessionId}`
    ).then((res) => res.data);
    const getRatedMovies: REATED_MOVIE = await axios(
      `${BASE_API_URL}account/${accountDetails.id}/rated/movies?api_key=${process.env.API_KEY}&session_id=${args.sessionId}`
    ).then((res) => res.data);
    const getRatedTvShows: REATED_TVSHOW = await axios(
      `${BASE_API_URL}account/${accountDetails.id}/rated/tv?api_key=${process.env.API_KEY}&session_id=${args.sessionId}`
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
  };

  createSession = (args: MUTATION_CREATE_SESSION_ARGS) =>
    axios(
      `${BASE_API_URL}authentication/session/new?api_key=${process.env.API_KEY}`,
      { method: "POST", data: { request_token: args.requestToken } }
    ).then((res) => res.data);
}
