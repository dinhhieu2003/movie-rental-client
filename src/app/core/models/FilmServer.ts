export interface FilmResponse {
    Message: string;
    Status: number;
    Data: FilmData;
}

export interface FilmData {
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
    filmName: string;
    filmUrl: string;
    description: string;
    thumbnailUrl: string;
    trailerUrl: string;
    releaseDate: string;
    duration: string;
    actors: string;
    director: string;
    language: string;
    numberOfViews: number;
    rating: number;
    age: number;
    rentalType: string;
    price: number;
    limitTime: number;
    subtitles: any[];
    narrations: any[];
    comments: any[];
    genres: any[];
}
