export interface IMovie {
  id: number,
  title: string,
  backdrop_path: string,
  poster_path: string,
  vote_average: number,
  release_date: string,
  genre_ids: number[],
  original_language: string
}

export interface IGenre {
  id: number,
  name: string
}


export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Countries {
  iso_3166_1: string;
  name: string;
}

export interface Companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string
}

export interface Genres {
  id: number;
  name: string;
}

export interface MovieDetaill {
  id: number,
  title: string,
  vote_average: number,
  spoken_languages: Language[],
  release_date: string,
  runtime: number,
  production_countries: Countries[],
  production_companies: Companies[],
  original_language: string,
  overview: string,
  homepage: string,
  genres: Genres[],
  budget: number,
  backdrop_path: string,
  poster_path: string
}


export interface Person {
  id: number,
  original_name: string,
  popularity: number,
  profile_path: string,
  character: string
}


export interface PersonDetail {
  id: number,
  name: string,
  also_known_as: string[],
  biography: string,
  birthday: string,
  deathday: string | null,
  homepage: string | null,
  place_of_birth: string,
  popularity: number,
  profile_path: string
}

