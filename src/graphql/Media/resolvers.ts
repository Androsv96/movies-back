import axios from "axios";
import { MOVIE, TVSHOW } from "../../utils/interfaces";

interface QueryMediaDetailsArgs {
  id: number;
  type: "tv" | "movie";
}

interface QueryMediaArgs {
  page: number;
}

interface QueryVariousMediaDetailsArgs {
  items: { id: number; type: "tv" | "movie" }[];
}

export const resolvers = {
  queries: {
    media: async (_, args: QueryMediaArgs) => {
      const movies = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${args.page}`
      ).then((res) => res.data.results);
      const tvShows = await axios(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&page=${args.page}`
      ).then((res) => res.data.results);
      const mappedMovies = movies.map((movie: MOVIE) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        type: "movie",
      }));
      const mappedTvShows = tvShows.map((tvShow: TVSHOW) => ({
        id: tvShow.id,
        title: tvShow.name,
        poster_path: tvShow.poster_path,
        release_date: tvShow.first_air_date,
        vote_average: tvShow.vote_average,
        type: "tv",
      }));
      return [...mappedMovies, ...mappedTvShows];
    },
    mediaDetails: async (_, args: QueryMediaDetailsArgs) => {
      if (args.type === "tv") {
        const tvDetail = await axios(
          `https://api.themoviedb.org/3/tv/${args.id}?api_key=${process.env.API_KEY}`
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
        `https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.API_KEY}`
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
    },
    mediasDetails: async (_, args: QueryVariousMediaDetailsArgs) => {
      const data = [];
      for (const item of args.items) {
        if (item.type === "tv") {
          const tvDetail = await axios(
            `https://api.themoviedb.org/3/tv/${item.id}?api_key=${process.env.API_KEY}`
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
            `https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_KEY}`
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
    },
  },
};