import { FilmData } from "./FilmServer";

export interface Banner{
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    imageUrl: string;
    film: FilmData;
}