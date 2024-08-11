import { MovieCard } from "./movie-card";

export interface Album {
    id: string,
    film: MovieCard[],
    albumName: string,
}