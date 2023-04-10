export const types = `
type Media {
  id: Int!
  title: String!
  poster_path: String
  release_date: String
  vote_average: Float!
  type: MediaType!
  genres: [String]
}

type MediaDetails {
  id: Int!
  title: String!
  genres: [Genres]
  overview: String
  vote_average: Float!
  release_date: String
  poster_path: String
  type: MediaType!
  production_companies: [ProductionCompanies]
}

type ProductionCompanies {
  id: Int!
  name: String!
}

type Genres {
  id: Int!
  name: String!
}

input VariousMediaDetails {
  id: Int!
  type: MediaType!
}

enum MediaType {
  movie
  tv
}
`;
