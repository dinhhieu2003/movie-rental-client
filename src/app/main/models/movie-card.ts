export interface MovieCard {
    Id: string,
    FilmName: string,
    ThumbnailUrl: string
}

export function getDefaultMovieCard(): MovieCard {
    return {
        Id: "không có id",
        FilmName: "đoán đi",
        ThumbnailUrl: "https://preview.redd.it/dancing-toothless-v0-q18gv0dfd4ac1.gif?width=300&auto=webp&s=dbe1ad40abae0754e0e5ee5899b1a930e4806c01"
    };
}