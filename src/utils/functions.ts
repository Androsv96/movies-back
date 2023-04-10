import { GENRE_LIST } from "./constants";

export const getGenres = (genres: number[]) => {
  const genresList = [];
  for (const genre of genres) {
    const foundGenre = GENRE_LIST.find((item) => item.id === genre);
    if (foundGenre) genresList.push(foundGenre.name);
  }
  return genresList;
};
