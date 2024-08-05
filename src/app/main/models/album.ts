import { Movie } from "./movie";

export interface Album {
    movies: Movie[],
    name: string,
}