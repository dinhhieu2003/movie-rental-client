interface Film {
    filmId: number,
    thumbnailImageSrc: string,
    filmTitle: string
}

interface Season {
    seasonId: number;
    filmId: number;
    seasonNumber: number;
    summary: string;
    releaseYear: number;
    averageRating: number;
    thumbnailImageSrc: string;
}

interface Episode {
    episodeId: number;
    filmSeasonId: number;
    episodeNumber: number;
    episodeTitle: string;
    thumbnailImageSrc: string;
}

const film: Film[] = [
    // Single Films
    { filmId: 1, thumbnailImageSrc: 'https://touchcinema.com/storage/phim-ke-danh-cap-giac-mo/phim-ke-danh-cap-giac-mo.jpg', filmTitle: 'Inception' },
    { filmId: 2, thumbnailImageSrc: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F58af398c-d206-446e-a587-bfff4449d94c_704x396.jpeg', filmTitle: 'The Godfather' },
    { filmId: 3, thumbnailImageSrc: 'https://d1jqhvzwrc220t.cloudfront.net/media/blog/800x450_5.webp', filmTitle: 'The Dark Knight' },
    { filmId: 4, thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WiCDscohAM2TnmUX65VwEYBbO-YZ0IvSA2hT9ofyfMHTVnUwXX5hr5h_BipI24_Zu0Q&usqp=CAU', filmTitle: 'Pulp Fiction' },
    { filmId: 5, thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO_TClh7CqMdS2ky-YJTkXzZZtcS1OMejeDs9T26C0YBJUMb_t3HSPRpqVz-ag8NBUYDY&usqp=CAU', filmTitle: 'Fight Club' },
    { filmId: 6, thumbnailImageSrc: 'https://cdn.quotesgram.com/img/21/93/1351081511-1994_forrest_gump_1.jpg', filmTitle: 'Forrest Gump' },
    { filmId: 7, thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_-j_N9fIpunypxUaOK-XHj51kxiEsxINGA&s', filmTitle: 'The Matrix' },
    { filmId: 8, thumbnailImageSrc: 'https://mir-s3-cdn-cf.behance.net/projects/404/b96064178494413.Y3JvcCwxNDk4LDExNzEsMCw4NzU.png', filmTitle: 'Interstellar' },
    { filmId: 9, thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLElDkJXrpyc09Z28q15C0olBZvvpAwR9_ZQ&s', filmTitle: 'Gladiator' },
    { filmId: 10, thumbnailImageSrc: 'https://lecinemaparadiso.co.uk/uploads/THE%20SHAWSHANK%20REDEMPTION%20image.jpg', filmTitle: 'The Shawshank Redemption' },
    // Series
    { filmId: 11, thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBHwXxZbJX733TLoYhEibdwG23aNp9vWRxCVcKPKk_TC_GVcz2emKTjkXGLKJ0xwasDg&usqp=CAU", filmTitle: "Breaking Bad" },
    { filmId: 12, thumbnailImageSrc: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1105420/capsule_616x353.jpg?t=1700810767", filmTitle: "Game of Thrones" },
    { filmId: 13, thumbnailImageSrc: "https://res.klook.com/image/upload/u_activities:hnnmfj2oqtp1azxoh1l3,w_1.0,ar_4:3,c_scale,e_blur:10000/c_fill,w_750,h_500/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/hnnmfj2oqtp1azxoh1l3.jpg", filmTitle: "Stranger Things" },
    { filmId: 14, thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPviGBB6hW_MEzfW2pj7-qgbaxP3_hPVKA8A&s", filmTitle: "The Witcher" },
    { filmId: 15, thumbnailImageSrc: "https://images.thedirect.com/media/article_full/mandalorian-pedro-pascal-season-3.jpg", filmTitle: "The Mandalorian" },
    { filmId: 16, thumbnailImageSrc: "https://resizing.flixster.com/c5XeWe5kfWQjpGyL2-fzQY4Upb4=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13398828_b_h10_aa.jpg", filmTitle: "The Crown" },
    { filmId: 17, thumbnailImageSrc: "https://uniathenaprods3.uniathena.com/s3fs-public/insights-article/seriesreview-e2-80-9cfriends-e2-80-9d_0.jpg", filmTitle: "Friends" },
    { filmId: 18, thumbnailImageSrc: "https://resizing.flixster.com/8nJUFmVSfYuWfAA6LVmGqJc4UH8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8992561_b_h10_aa.jpg", filmTitle: "Sherlock" },
    { filmId: 19, thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/en/2/28/Westworld_season_1.png", filmTitle: "Westworld" },
    { filmId: 20, thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Office_Season_8.jpg", filmTitle: "The Office" }
];

const seasons: Season[] = [
    {
        seasonId: 1,
        filmId: 1,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2017,
        averageRating: 8,
        thumbnailImageSrc: 'https://touchcinema.com/storage/phim-ke-danh-cap-giac-mo/phim-ke-danh-cap-giac-mo.jpg'
    },
    {
        seasonId: 1,
        filmId: 2,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2000,
        averageRating: 2,
        thumbnailImageSrc: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F58af398c-d206-446e-a587-bfff4449d94c_704x396.jpeg'
    },
    {
        seasonId: 1,
        filmId: 3,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2013,
        averageRating: 4,
        thumbnailImageSrc: 'https://d1jqhvzwrc220t.cloudfront.net/media/blog/800x450_5.webp'
    },
    {
        seasonId: 1,
        filmId: 4,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2014,
        averageRating: 10,
        thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WiCDscohAM2TnmUX65VwEYBbO-YZ0IvSA2hT9ofyfMHTVnUwXX5hr5h_BipI24_Zu0Q&usqp=CAU'
    },
    {
        seasonId: 1,
        filmId: 5,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2009,
        averageRating: 8,
        thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO_TClh7CqMdS2ky-YJTkXzZZtcS1OMejeDs9T26C0YBJUMb_t3HSPRpqVz-ag8NBUYDY&usqp=CAU'
    },
    {
        seasonId: 1,
        filmId: 6,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2009,
        averageRating: 6,
        thumbnailImageSrc: 'https://cdn.quotesgram.com/img/21/93/1351081511-1994_forrest_gump_1.jpg'
    },
    {
        seasonId: 1,
        filmId: 7,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2023,
        averageRating: 4,
        thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_-j_N9fIpunypxUaOK-XHj51kxiEsxINGA&s'
    },
    {
        seasonId: 1,
        filmId: 8,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2015,
        averageRating: 8,
        thumbnailImageSrc: 'https://mir-s3-cdn-cf.behance.net/projects/404/b96064178494413.Y3JvcCwxNDk4LDExNzEsMCw4NzU.png'
    },
    {
        seasonId: 1,
        filmId: 9,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2014,
        averageRating: 5,
        thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLElDkJXrpyc09Z28q15C0olBZvvpAwR9_ZQ&s'
    },
    {
        seasonId: 1,
        filmId: 10,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2006,
        averageRating: 9,
        thumbnailImageSrc: 'https://lecinemaparadiso.co.uk/uploads/THE%20SHAWSHANK%20REDEMPTION%20image.jpg'
    },
    {
        seasonId: 1,
        filmId: 11,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2012,
        averageRating: 5,
        thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBHwXxZbJX733TLoYhEibdwG23aNp9vWRxCVcKPKk_TC_GVcz2emKTjkXGLKJ0xwasDg&usqp=CAU'
    },
    {
        seasonId: 1,
        filmId: 12,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2017,
        averageRating: 3,
        thumbnailImageSrc: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1105420/capsule_616x353.jpg?t=1700810767'
    },
    {
        seasonId: 1,
        filmId: 13,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2005,
        averageRating: 10,
        thumbnailImageSrc: 'https://res.klook.com/image/upload/u_activities:hnnmfj2oqtp1azxoh1l3,w_1.0,ar_4:3,c_scale,e_blur:10000/c_fill,w_750,h_500/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/hnnmfj2oqtp1azxoh1l3.jpg'
    },
    {
        seasonId: 1,
        filmId: 14,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2019,
        averageRating: 4,
        thumbnailImageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPviGBB6hW_MEzfW2pj7-qgbaxP3_hPVKA8A&s'
    },
    {
        seasonId: 1,
        filmId: 15,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2013,
        averageRating: 4,
        thumbnailImageSrc: 'https://images.thedirect.com/media/article_full/mandalorian-pedro-pascal-season-3.jpg'
    },
    {
        seasonId: 1,
        filmId: 16,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2013,
        averageRating: 7,
        thumbnailImageSrc: 'https://resizing.flixster.com/c5XeWe5kfWQjpGyL2-fzQY4Upb4=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13398828_b_h10_aa.jpg'
    },
    {
        seasonId: 1,
        filmId: 17,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2016,
        averageRating: 6,
        thumbnailImageSrc: 'https://uniathenaprods3.uniathena.com/s3fs-public/insights-article/seriesreview-e2-80-9cfriends-e2-80-9d_0.jpg'
    },
    {
        seasonId: 1,
        filmId: 18,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2017,
        averageRating: 2,
        thumbnailImageSrc: 'https://resizing.flixster.com/8nJUFmVSfYuWfAA6LVmGqJc4UH8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8992561_b_h10_aa.jpg'
    },
    {
        seasonId: 1,
        filmId: 19,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2016,
        averageRating: 8,
        thumbnailImageSrc: 'https://upload.wikimedia.org/wikipedia/en/2/28/Westworld_season_1.png'
    },
    {
        seasonId: 1,
        filmId: 20,
        seasonNumber: 1,
        summary: 'A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.A placeholder summary for this film.',
        releaseYear: 2010,
        averageRating: 5,
        thumbnailImageSrc: 'https://upload.wikimedia.org/wikipedia/en/a/ae/The_Office_Season_8.jpg'
    },
    // Breaking Bad Season 2
    { seasonId: 21, filmId: 11, seasonNumber: 2, summary: "Walter White continues his transformation into the infamous Heisenberg as he delves deeper into the drug trade, facing new threats and challenges.", releaseYear: 2009, averageRating: 9.5, thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBHwXxZbJX733TLoYhEibdwG23aNp9vWRxCVcKPKk_TC_GVcz2emKTjkXGLKJ0xwasDg&usqp=CAU" },

    // Game of Thrones Season 2
    { seasonId: 22, filmId: 12, seasonNumber: 2, summary: "The Seven Kingdoms face escalating conflicts and power struggles as new characters emerge and alliances shift dramatically.", releaseYear: 2012, averageRating: 8.9, thumbnailImageSrc: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1105420/capsule_616x353.jpg?t=1700810767" },

    // Stranger Things Season 2
    { seasonId: 23, filmId: 13, seasonNumber: 2, summary: "The Hawkins gang faces new supernatural threats as they uncover more about the mysterious Upside Down and its impact on their lives.", releaseYear: 2017, averageRating: 8.8, thumbnailImageSrc: "https://res.klook.com/image/upload/u_activities:hnnmfj2oqtp1azxoh1l3,w_1.0,ar_4:3,c_scale,e_blur:10000/c_fill,w_750,h_500/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/hnnmfj2oqtp1azxoh1l3.jpg" },

    // The Witcher Season 2
    { seasonId: 24, filmId: 14, seasonNumber: 2, summary: "Geralt of Rivia continues his monster-slaying adventures while grappling with his complex destiny and the political intrigue surrounding him.", releaseYear: 2021, averageRating: 8.0, thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPviGBB6hW_MEzfW2pj7-qgbaxP3_hPVKA8A&s" },

    // The Mandalorian Season 2
    { seasonId: 25, filmId: 15, seasonNumber: 2, summary: "The Mandalorian's journey continues as he navigates the galaxy and faces new enemies, all while protecting Grogu from the dangers that lurk.", releaseYear: 2020, averageRating: 8.9, thumbnailImageSrc: "https://images.thedirect.com/media/article_full/mandalorian-pedro-pascal-season-3.jpg" },

    // The Crown Season 2
    { seasonId: 26, filmId: 16, seasonNumber: 2, summary: "The second season of The Crown delves into the personal and political challenges faced by Queen Elizabeth II and her family during the 1950s.", releaseYear: 2017, averageRating: 8.7, thumbnailImageSrc: "https://resizing.flixster.com/c5XeWe5kfWQjpGyL2-fzQY4Upb4=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13398828_b_h10_aa.jpg" },

    // Friends Season 2
    { seasonId: 27, filmId: 17, seasonNumber: 2, summary: "The group of friends continues their comedic adventures and romantic entanglements as they navigate life in New York City.", releaseYear: 1995, averageRating: 8.8, thumbnailImageSrc: "https://uniathenaprods3.uniathena.com/s3fs-public/insights-article/seriesreview-e2-80-9cfriends-e2-80-9d_0.jpg" },

    // Sherlock Season 2
    { seasonId: 28, filmId: 18, seasonNumber: 2, summary: "Sherlock Holmes and Dr. John Watson tackle new, intricate cases in modern-day London, testing their skills and friendship.", releaseYear: 2012, averageRating: 9.0, thumbnailImageSrc: "https://resizing.flixster.com/8nJUFmVSfYuWfAA6LVmGqJc4UH8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8992561_b_h10_aa.jpg" },

    // Westworld Season 2
    { seasonId: 29, filmId: 19, seasonNumber: 2, summary: "The artificial beings in Westworld start to gain awareness and explore their freedom, leading to unexpected and dangerous consequences.", releaseYear: 2018, averageRating: 8.5, thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/en/2/28/Westworld_season_1.png" },

    // The Office Season 2
    { seasonId: 30, filmId: 20, seasonNumber: 2, summary: "The Dunder Mifflin employees continue to navigate office politics, personal relationships, and their quirky boss, Michael Scott.", releaseYear: 2006, averageRating: 8.7, thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Office_Season_8.jpg" }
    , { seasonId: 31, filmId: 11, seasonNumber: 3, summary: "As Walter White's criminal empire grows, he faces escalating threats from law enforcement and rival drug dealers, leading to a dramatic confrontation.", releaseYear: 2010, averageRating: 9.6, thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBHwXxZbJX733TLoYhEibdwG23aNp9vWRxCVcKPKk_TC_GVcz2emKTjkXGLKJ0xwasDg&usqp=CAU" },

    // Game of Thrones Season 3
    { seasonId: 32, filmId: 12, seasonNumber: 3, summary: "The battle for the Iron Throne intensifies with new alliances and betrayals, culminating in one of the most shocking events in Westeros.", releaseYear: 2013, averageRating: 9.1, thumbnailImageSrc: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1105420/capsule_616x353.jpg?t=1700810767" },

    // Stranger Things Season 3
    { seasonId: 33, filmId: 13, seasonNumber: 3, summary: "The Hawkins gang faces a new threat from the Upside Down while dealing with their own personal challenges and changes as they grow older.", releaseYear: 2019, averageRating: 8.9, thumbnailImageSrc: "https://res.klook.com/image/upload/u_activities:hnnmfj2oqtp1azxoh1l3,w_1.0,ar_4:3,c_scale,e_blur:10000/c_fill,w_750,h_500/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/hnnmfj2oqtp1azxoh1l3.jpg" },

    // The Witcher Season 3
    { seasonId: 34, filmId: 14, seasonNumber: 3, summary: "Geralt faces new foes and allies as he navigates the complex politics and sorcery of the Continent, with destiny playing a crucial role in his journey.", releaseYear: 2023, averageRating: 8.2, thumbnailImageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPviGBB6hW_MEzfW2pj7-qgbaxP3_hPVKA8A&s" },

    // The Mandalorian Season 3
    { seasonId: 35, filmId: 15, seasonNumber: 3, summary: "Din Djarin's quest takes him across the galaxy as he uncovers secrets about Grogu's past and confronts new threats in the Star Wars universe.", releaseYear: 2023, averageRating: 8.8, thumbnailImageSrc: "https://images.thedirect.com/media/article_full/mandalorian-pedro-pascal-season-3.jpg" },

    // The Crown Season 3
    { seasonId: 36, filmId: 16, seasonNumber: 3, summary: "The Crown continues to explore the reign of Queen Elizabeth II, focusing on the 1960s and the evolving roles of the royal family and British politics.", releaseYear: 2019, averageRating: 8.9, thumbnailImageSrc: "https://resizing.flixster.com/c5XeWe5kfWQjpGyL2-fzQY4Upb4=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13398828_b_h10_aa.jpg" },

    // Friends Season 3
    { seasonId: 37, filmId: 17, seasonNumber: 3, summary: "The friends face new romantic entanglements and professional challenges, all while their close-knit bonds are tested through humorous and emotional moments.", releaseYear: 1996, averageRating: 8.9, thumbnailImageSrc: "https://uniathenaprods3.uniathena.com/s3fs-public/insights-article/seriesreview-e2-80-9cfriends-e2-80-9d_0.jpg" },

    // Sherlock Season 3
    { seasonId: 38, filmId: 18, seasonNumber: 3, summary: "Sherlock returns from the dead and reunites with Watson to solve more intricate cases, uncovering deeper layers of personal and criminal mysteries.", releaseYear: 2014, averageRating: 9.1, thumbnailImageSrc: "https://resizing.flixster.com/8nJUFmVSfYuWfAA6LVmGqJc4UH8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8992561_b_h10_aa.jpg" },

    // Westworld Season 3
    { seasonId: 39, filmId: 19, seasonNumber: 3, summary: "The story shifts to a new setting outside the park as the hosts seek freedom in a world that's vastly different from what they knew.", releaseYear: 2020, averageRating: 8.1, thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/en/2/28/Westworld_season_1.png" },

    // The Office Season 3
    { seasonId: 40, filmId: 20, seasonNumber: 3, summary: "The employees of Dunder Mifflin face new dynamics and challenges in their workplace, with Michael Scott's leadership continuing to shape their experiences.", releaseYear: 2007, averageRating: 8.9, thumbnailImageSrc: "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Office_Season_8.jpg" }

];
