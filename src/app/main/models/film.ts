import { CommentData } from "./comment";

export interface FilmData {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isDeleted: boolean;
    subtitles: string[];
    narrations: string[];
    comments: CommentData[];
    genres: string[];
    Id: string;
    FilmName: string;
    FilmUrl: string;
    Description: string;
    ThumbnailUrl: string;
    TrailerUrl: string;
    ReleaseDate: string;
    Duration: string;
    Actors: string[];
    Director: string;
    Language: string;
    RatingScore: number;
    Age: number;
    Price: number;
    LimitTime: number;
    RentalType: string;
}

export function getDefaultFilmData(id: string | null = null): FilmData{
    return {
        isActive: false,
        isDeleted: false,
        createdAt: '11/11/1111',
        updatedAt: '22/22/2222',
        Id: id ? id :'superid',
        FilmName: 'không có tên',
        FilmUrl: 'https://cdn.pixabay.com/video/2017/06/05/9584-220312371_large.mp4',
        Description: 'phim hỏng rồi qua web nước ngoài mà coi',
        ThumbnailUrl: '',
        TrailerUrl: '',
        ReleaseDate: '00/00/9999',
        Duration: '',
        Actors: ["Nhà","Làm"],
        Director: 'Vô Danh',
        Language: 'Việt',
        RatingScore:-1,
        Age: 0,
        RentalType: '',
        Price: 0,
        LimitTime: 0,
        subtitles: [],
        narrations: [],
        comments: [],
        genres: []
      };
}
