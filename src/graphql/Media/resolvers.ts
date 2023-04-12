import axios from "axios";
import { MOVIE, TVSHOW } from "../../utils/interfaces";
import { getGenres } from "../../utils/functions";
import { BASE_API_URL } from "../../utils/constants";
import {
  MUTATION_ADD_RATING_ARGS,
  QUERY_MEDIA_ARGS,
  QUERY_MEDIA_DETAIL_ARGS,
  QUERY_VARIOUS_MEDIA_DETAILS_ARGS,
} from "./interfaces";
import { MediaRepository } from "./repository";

const mediaRepository = new MediaRepository();

export const resolvers = {
  queries: {
    media: (_, args: QUERY_MEDIA_ARGS) => mediaRepository.getMedia(args),
    mediaDetails: (_, args: QUERY_MEDIA_DETAIL_ARGS) =>
      mediaRepository.getMediaDetails(args),
    mediasDetails: (_, args: QUERY_VARIOUS_MEDIA_DETAILS_ARGS) =>
      mediaRepository.getMediasDetails(args),
  },
  mutations: {
    addRating: (_, args: MUTATION_ADD_RATING_ARGS) =>
      mediaRepository.addRating(args),
  },
};
