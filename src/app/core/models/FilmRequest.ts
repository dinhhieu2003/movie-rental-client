import { FilmData } from "../../main/models/film";

export  interface FilmRequest {
    Message: string,
    Status: number,
    Data: FilmData,
}