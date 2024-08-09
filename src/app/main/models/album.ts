import { Movie } from "./movie";

export interface Album {
    id: string,
    film: Movie[],
    albumName: string,
}