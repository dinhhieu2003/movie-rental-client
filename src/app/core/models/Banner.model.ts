import { FilmData } from "../../main/models/film";


export interface Banner{
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    imageUrl: string;
    Film: FilmData;
}