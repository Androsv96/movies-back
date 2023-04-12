export interface QUERY_MEDIA_DETAIL_ARGS {
  id: number;
  type: "tv" | "movie";
}

export interface QUERY_MEDIA_ARGS {
  page: number;
}

export interface QUERY_VARIOUS_MEDIA_DETAILS_ARGS {
  items: { id: number; type: "tv" | "movie" }[];
}

export interface MUTATION_ADD_RATING_ARGS {
  inputData: {
    mediaID: number;
    type: "tv" | "movie";
    rating: number;
    session_id: string;
  };
}
