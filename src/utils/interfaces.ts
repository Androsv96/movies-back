export interface TVSHOW {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface MOVIE {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface MOVIE_DETAIL {
  overview: string;
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  title: string;
  poster_path: string;
  vote_average: number;
  production_companies: { id: number; name: string }[];
}

export interface TVSHOW_DETAIL {
  overview: string;
  backdrop_path: string;
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  name: string;
  poster_path: string;
  vote_average: number;
  production_companies: { id: number; name: string }[];
}

export interface User {
  id: number;
  name: string;
  username: string;
}

interface RESULT_RATED_TVSHOW extends TVSHOW {
  rating: number;
}

interface RESULT_RATED_MOVIE extends MOVIE {
  rating: number;
}

export interface REATED_TVSHOW {
  page: number;
  results: RESULT_RATED_TVSHOW[];
  total_pages: number;
  total_results: number;
}

export interface REATED_MOVIE {
  page: number;
  results: RESULT_RATED_MOVIE[];
  total_pages: number;
  total_results: number;
}
