import { FilmData } from "./FilmServer";

export interface Banner{
    id: string,
    isActive: boolean,
    isDelete: boolean,
    createAt: Date,
    updateAt: Date,
    film: FilmData,
    imageUrl: string;
}