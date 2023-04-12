import axios from "axios";
import { BASE_API_URL } from "../../utils/constants";
import { MOVIE, TVSHOW } from "../../utils/interfaces";
import { getGenres } from "../../utils/functions";
import {
  MUTATION_ADD_RATING_ARGS,
  QUERY_MEDIA_ARGS,
  QUERY_MEDIA_DETAIL_ARGS,
  QUERY_VARIOUS_MEDIA_DETAILS_ARGS,
} from "./interfaces";

export class MediaRepository {
  constructor() {}

  getMedia = async (args: QUERY_MEDIA_ARGS) => {
    const movies = await axios(
      `${BASE_API_URL}movie/popular?api_key=${process.env.API_KEY}&page=${args.page}`
    ).then((res) => res.data.results);
    const tvShows = await axios(
      `${BASE_API_URL}tv/popular?api_key=${process.env.API_KEY}&page=${args.page}`
    ).then((res) => res.data.results);
    const mappedMovies = movies.map((movie: MOVIE) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      type: "movie",
      genres: getGenres(movie.genre_ids),
    }));
    const mappedTvShows = tvShows.map((tvShow: TVSHOW) => ({
      id: tvShow.id,
      title: tvShow.name,
      poster_path: tvShow.poster_path,
      release_date: tvShow.first_air_date,
      vote_average: tvShow.vote_average,
      type: "tv",
      genres: getGenres(tvShow.genre_ids),
    }));
    return [...mappedMovies, ...mappedTvShows];
  };

  getMediaDetails = async (args: QUERY_MEDIA_DETAIL_ARGS) => {
    if (args.type === "tv") {
      const tvDetail = await axios(
        `${BASE_API_URL}tv/${args.id}?api_key=${process.env.API_KEY}`
      ).then((res) => res.data);
      return {
        overview: tvDetail.overview,
        poster_path: tvDetail.poster_path,
        release_date: tvDetail.first_air_date,
        genres: tvDetail.genres,
        vote_average: tvDetail.vote_average,
        production_companies: tvDetail.production_companies,
        title: tvDetail.name,
        type: "tv",
      };
    }
    const movieDetail = await axios(
      `${BASE_API_URL}movie/${args.id}?api_key=${process.env.API_KEY}`
    ).then((res) => res.data);
    return {
      overview: movieDetail.overview,
      poster_path: movieDetail.poster_path,
      release_date: movieDetail.release_date,
      genres: movieDetail.genres,
      vote_average: movieDetail.vote_average,
      production_companies: movieDetail.production_companies,
      title: movieDetail.title,
      type: "movie",
    };
  };

  getMediasDetails = async (args: QUERY_VARIOUS_MEDIA_DETAILS_ARGS) => {
    const data = [];
    for (const item of args.items) {
      if (item.type === "tv") {
        const tvDetail = await axios(
          `${BASE_API_URL}tv/${item.id}?api_key=${process.env.API_KEY}`
        ).then((res) => res.data);
        data.push({
          id: tvDetail.id,
          overview: tvDetail.overview,
          poster_path: tvDetail.poster_path,
          release_date: tvDetail.first_air_date,
          genres: tvDetail.genres,
          vote_average: tvDetail.vote_average,
          production_companies: tvDetail.production_companies,
          title: tvDetail.name,
          type: "tv",
        });
      } else {
        const movieDetail = await axios(
          `${BASE_API_URL}movie/${item.id}?api_key=${process.env.API_KEY}`
        ).then((res) => res.data);
        data.push({
          id: movieDetail.id,
          overview: movieDetail.overview,
          poster_path: movieDetail.poster_path,
          release_date: movieDetail.release_date,
          genres: movieDetail.genres,
          vote_average: movieDetail.vote_average,
          production_companies: movieDetail.production_companies,
          title: movieDetail.title,
          type: "movie",
        });
      }
    }
    return data;
  };

  addRating = async (args: MUTATION_ADD_RATING_ARGS) => {
    const { mediaID, type, rating, session_id } = args.inputData;
    if (type === "tv") {
      return axios(
        `${BASE_API_URL}tv/${mediaID}/rating?api_key=${process.env.API_KEY}&session_id=${session_id}`,
        {
          method: "POST",
          data: { value: rating },
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.data);
    }
    return axios(
      `${BASE_API_URL}movie/${mediaID}/rating?api_key=${process.env.API_KEY}&session_id=${session_id}`,
      {
        data: { value: rating },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.data);
  };
}
