import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

enum Genre {
  Romance = "Lãng Mạn",
  Action = "Hành Động",
  Comedy = "Hài",
  Drama = "Kịch",
  // Add more genres as needed
}

enum PageIndex {
  ForEpisode,
  ForSeason,
  ForRelate,
}

enum Country {
  Vietnam = "Việt Nam",
  USA = "USA",
  UK = "UK",
  Korea = "Hàn Quốc"
  // Add more countries as needed
}

type IsFollowed = boolean;
type Source = string;
type Summary = string;
type Rating = number;
type Season = string;
type Year = number;
type Title = string;

interface Movie {
  id: number;
  thumbnailImage: string;
  title: Title;
}

interface MovieServerSource {
  idMovie: number;
  link: SafeResourceUrl;
}

interface Actor {
  name: string;
  role: string;
}

interface MovieDetail {
  summary: Summary;
  rate: Rating;
  currentUserRate: Rating;
  isFollowed: IsFollowed;
  year: Year;
  season: Season;
  genres: Genre[];
  country: Country;
  actors: Actor[];
}

const movies: Movie[] = [
  { id: 1, thumbnailImage: 'https://touchcinema.com/storage/phim-ke-danh-cap-giac-mo/phim-ke-danh-cap-giac-mo.jpg', title: 'Inception' },
  { id: 2, thumbnailImage: 'https://cdn.tgdd.vn/Files/2020/12/24/1315847/review-phim-ky-sinh-trung-parasite-2019-phim-han-quoc-dau-tien-doat-giai-oscar-202112310954530182.jpg', title: 'Parasite' },
  { id: 3, thumbnailImage: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F58af398c-d206-446e-a587-bfff4449d94c_704x396.jpeg', title: 'The Godfather' },
  { id: 4, thumbnailImage: 'https://cdn-images.vtv.vn/zoom/320_200/2019/6/19/1omneoyvq-15609138582031265277809.jpg', title: 'Avengers: Endgame' },
  { id: 5, thumbnailImage: 'https://i.etsystatic.com/39153669/r/il/d36f4d/4473413805/il_570xN.4473413805_jjvj.jpg', title: 'Joker' },
  { id: 6, thumbnailImage: 'https://d1jqhvzwrc220t.cloudfront.net/media/blog/800x450_5.webp', title: 'The Dark Knight' },
  { id: 7, thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WiCDscohAM2TnmUX65VwEYBbO-YZ0IvSA2hT9ofyfMHTVnUwXX5hr5h_BipI24_Zu0Q&usqp=CAU', title: 'Pulp Fiction' },
  { id: 8, thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO_TClh7CqMdS2ky-YJTkXzZZtcS1OMejeDs9T26C0YBJUMb_t3HSPRpqVz-ag8NBUYDY&usqp=CAU', title: 'Fight Club' },
  { id: 9, thumbnailImage: 'https://cdn.quotesgram.com/img/21/93/1351081511-1994_forrest_gump_1.jpg', title: 'Forrest Gump' },
  { id: 10, thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_-j_N9fIpunypxUaOK-XHj51kxiEsxINGA&s', title: 'The Matrix' },
  { id: 11, thumbnailImage: 'https://mir-s3-cdn-cf.behance.net/projects/404/b96064178494413.Y3JvcCwxNDk4LDExNzEsMCw4NzU.png', title: 'Interstellar' },
  { id: 12, thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLElDkJXrpyc09Z28q15C0olBZvvpAwR9_ZQ&s', title: 'Gladiator' },
  { id: 13, thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKt7b8RXROBOVbJlpYkmlikQtrp7bFzqXiHw&s', title: 'Schindler\'s List' },
  { id: 14, thumbnailImage: 'https://sm.ign.com/ign_ap/screenshot/default/the-lord-of-the-rings-the-return-of-the-king-59b7d7a3775bf_dhkf.jpg', title: 'The Lord of the Rings: The Return of the King' },
  { id: 15, thumbnailImage: 'https://lecinemaparadiso.co.uk/uploads/THE%20SHAWSHANK%20REDEMPTION%20image.jpg', title: 'The Shawshank Redemption' },
  { id: 16, thumbnailImage: 'https://steamuserimages-a.akamaihd.net/ugc/1010438325529634125/EB2D918ED002AEBF56763513488197ACFF69773F/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true', title: 'Star Wars: Episode IV - A New Hope' },
  { id: 17, thumbnailImage: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/753B/production/_126311003_silenceofthelambs-mgm-orion-pictures.jpg', title: 'The Silence of the Lambs' },
  { id: 18, thumbnailImage: 'https://nz.originalfilmart.com/cdn/shop/products/saving_private_ryan_1998_british_quad_original_film_art_a_600x.jpg?v=1571951106', title: 'Saving Private Ryan' },
  { id: 19, thumbnailImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG5tBPGS5UneOLZB2FZiaxT67_JwNB95QVWEe41V7S3IFx9oQCaiK-ws84-PfvfIVzx6w&usqp=CAU', title: 'The Green Mile' },
  { id: 20, thumbnailImage: 'https://s29288.pcdn.co/wp-content/uploads/2020/08/seven-image-750.jpg', title: 'Se7en' },
];

const movieServerSources: MovieServerSource[] = [
  { idMovie: 1, link: 'https://www.youtube.com/embed/P-BBYznfOCc?si=dfnaIP9vTMERlAEo' },
  { idMovie: 2, link: 'https://www.youtube.com/embed/qqvzkRKP_08?si=a45C6xmwKwe__XzZ' },
  { idMovie: 3, link: 'https://www.youtube.com/embed/DtwJX8ugto4?si=IYRVtUBMFuq4FqOn' },
  { idMovie: 4, link: 'https://www.youtube.com/embed/Bhm2YXwiwnY?si=JSm4UIgdaivnTz7e' },
  { idMovie: 5, link: 'https://www.youtube.com/embed/k4oOEHjqR9Y?si=qjhnALyyKYiQF9Br' },
  { idMovie: 6, link: 'https://www.youtube.com/embed/mIRcSiff5bk?si=uYnBRcTgTzWtVSXQ' },
  { idMovie: 7, link: 'https://www.youtube.com/embed/_6dz6u5Zixo?si=ksHligbwfVbopCyT' },
  { idMovie: 8, link: 'https://www.youtube.com/embed/Dus22FRlQt8?si=5Ub_PL3GDGWj7k5J' },
  { idMovie: 9, link: 'https://www.youtube.com/embed/JmYXHrGU08s?si=KfUpjRPIZa9w5txm' },
  { idMovie: 10, link: 'https://www.youtube.com/embed/vGehC0v7Hgc?si=zwjdzPCdwFjbd7F1' },
  { idMovie: 11, link: 'https://www.youtube.com/embed/YUlcU5wCtGs?si=KP0hYiRWRn17J4HO' },
  { idMovie: 12, link: 'https://www.youtube.com/embed/8FGtGXaMOLQ?si=sgZwK-pGYivWc8QW' },
  { idMovie: 13, link: 'https://www.youtube.com/embed/Qitiren47tw?si=mDZiFKsyrOsxEAuX' },
  { idMovie: 14, link: 'https://www.youtube.com/embed/N2u_bTxeGKw?si=VSalssafzi-u_lkQ' },
  { idMovie: 15, link: 'https://www.youtube.com/embed/D_FKJqxVhak?si=k_LF-570R9DNP6ZA' },
  { idMovie: 16, link: 'https://www.youtube.com/embed/JYCYEk7lL_Q?si=rHRJm6bD75sc2jlQ' },
  { idMovie: 17, link: 'https://www.youtube.com/embed/pzZ0ecpaTbE?si=p5qzv9JSTckNYhS6' },
  { idMovie: 18, link: 'https://www.youtube.com/embed/7w5oLdwBHsU?si=_M5cPFqz8V56iEMc' },
  { idMovie: 19, link: 'https://www.youtube.com/embed/Es41VeVqbH8?si=mpB6VJX1NRZto_ar' },
  { idMovie: 20, link: 'https://www.youtube.com/embed/S5bHyecQMIg?si=Sgr2gSpbS3eFD_xg' },
];

const movieDetails: MovieDetail[] = [
  {
    summary: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rate: 8.8,
    currentUserRate: -1,
    isFollowed: true,
    year: 2010,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Leonardo DiCaprio', role: 'Cobb' },
      { name: 'Joseph Gordon-Levitt', role: 'Arthur' },
    ],
  },
  {
    summary: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: false,
    year: 2019,
    season: '1',
    genres: [Genre.Drama, Genre.Comedy],
    country: Country.Korea,
    actors: [
      { name: 'Kang-ho Song', role: 'Ki Taek' },
      { name: 'Sun-kyun Lee', role: 'Dong Ik' },
    ],
  },
  {
    summary: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rate: 9.2,
    currentUserRate: -1,
    isFollowed: true,
    year: 1972,
    season: '1',
    genres: [Genre.Drama, Genre.Action],
    country: Country.USA,
    actors: [
      { name: 'Marlon Brando', role: 'Don Vito Corleone' },
      { name: 'Al Pacino', role: 'Michael Corleone' },
    ],
  },
  {
    summary: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    rate: 8.4,
    currentUserRate: -1,
    isFollowed: true,
    year: 2019,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Robert Downey Jr.', role: 'Iron Man' },
      { name: 'Chris Evans', role: 'Captain America' },
    ],
  },
  {
    summary: 'In Gotham City, mentally troubled comedian Arthur Fleck embarks on a downward spiral of social revolution and bloody crime. This path brings him face-to-face with his infamous alter-ego: The Joker.',
    rate: 8.5,
    currentUserRate: -1,
    isFollowed: false,
    year: 2019,
    season: '1',
    genres: [Genre.Drama, Genre.Action],
    country: Country.USA,
    actors: [
      { name: 'Joaquin Phoenix', role: 'Arthur Fleck' },
      { name: 'Robert De Niro', role: 'Murray Franklin' },
    ],
  },
  {
    summary: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rate: 9.0,
    currentUserRate: -1,
    isFollowed: true,
    year: 2008,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Christian Bale', role: 'Bruce Wayne' },
      { name: 'Heath Ledger', role: 'Joker' },
    ],
  },
  {
    summary: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rate: 8.9,
    currentUserRate: -1,
    isFollowed: false,
    year: 1994,
    season: '1',
    genres: [Genre.Drama, Genre.Comedy],
    country: Country.USA,
    actors: [
      { name: 'John Travolta', role: 'Vincent Vega' },
      { name: 'Samuel L. Jackson', role: 'Jules Winnfield' },
    ],
  },
  {
    summary: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.',
    rate: 8.8,
    currentUserRate: -1,
    isFollowed: true,
    year: 1999,
    season: '1',
    genres: [Genre.Drama, Genre.Action],
    country: Country.USA,
    actors: [
      { name: 'Brad Pitt', role: 'Tyler Durden' },
      { name: 'Edward Norton', role: 'The Narrator' },
    ],
  },
  {
    summary: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.',
    rate: 8.8,
    currentUserRate: -1,
    isFollowed: true,
    year: 1994,
    season: '1',
    genres: [Genre.Drama, Genre.Romance],
    country: Country.USA,
    actors: [
      { name: 'Tom Hanks', role: 'Forrest Gump' },
      { name: 'Robin Wright', role: 'Jenny Curran' },
    ],
  },
  {
    summary: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    rate: 8.7,
    currentUserRate: -1,
    isFollowed: true,
    year: 1999,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Keanu Reeves', role: 'Neo' },
      { name: 'Laurence Fishburne', role: 'Morpheus' },
    ],
  },
  {
    
    summary: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: true,
    year: 2014,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Matthew McConaughey', role: 'Cooper' },
      { name: 'Anne Hathaway', role: 'Brand' },
    ],
  },
  {
    summary: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    rate: 8.5,
    currentUserRate: -1,
    isFollowed: true,
    year: 2000,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Russell Crowe', role: 'Maximus' },
      { name: 'Joaquin Phoenix', role: 'Commodus' },
    ],
  },
  {
    summary: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    rate: 9.0,
    currentUserRate: -1,
    isFollowed: false,
    year: 1993,
    season: '1',
    genres: [Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Liam Neeson', role: 'Oskar Schindler' },
      { name: 'Ben Kingsley', role: 'Itzhak Stern' },
    ],
  },
  {
    summary: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    rate: 8.9,
    currentUserRate: -1,
    isFollowed: true,
    year: 2003,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Elijah Wood', role: 'Frodo' },
      { name: 'Viggo Mortensen', role: 'Aragorn' },
    ],
  },
  {
    summary: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rate: 9.3,
    currentUserRate: -1,
    isFollowed: true,
    year: 1994,
    season: '1',
    genres: [Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Tim Robbins', role: 'Andy Dufresne' },
      { name: 'Morgan Freeman', role: 'Ellis Boyd "Red" Redding' },
    ],
  },
  {
    summary: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: true,
    year: 1977,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Mark Hamill', role: 'Luke Skywalker' },
      { name: 'Harrison Ford', role: 'Han Solo' },
    ],
  },
  {
    summary: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: true,
    year: 1991,
    season: '1',
    genres: [Genre.Drama, Genre.Action],
    country: Country.USA,
    actors: [
      { name: 'Jodie Foster', role: 'Clarice Starling' },
      { name: 'Anthony Hopkins', role: 'Dr. Hannibal Lecter' },
    ],
  },
  {
    summary: 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: true,
    year: 1998,
    season: '1',
    genres: [Genre.Action, Genre.Drama],
    country: Country.USA,
    actors: [
      { name: 'Tom Hanks', role: 'Captain Miller' },
      { name: 'Matt Damon', role: 'Private Ryan' },
    ],
  },
  {
    summary: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: true,
    year: 1999,
    season: '1',
    genres: [Genre.Drama, Genre.Action],
    country: Country.USA,
    actors: [
      { name: 'Tom Hanks', role: 'Paul Edgecomb' },
      { name: 'Michael Clarke Duncan', role: 'John Coffey' },
    ],
  },
  {
    summary: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
    rate: 8.6,
    currentUserRate: -1,
    isFollowed: true,
    year: 1995,
    season: '1',
    genres: [Genre.Drama, Genre.Action],
    country: Country.USA,
    actors: [
      { name: 'Morgan Freeman', role: 'Detective Somerset' },
      { name: 'Brad Pitt', role: 'Detective Mills' },
    ],
  },
];



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-video-streaming',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-streaming.component.html',
  styleUrls: ['./video-streaming.component.css'] // Updated from styleUrl to styleUrls
})
export class VideoStreamingComponent implements OnInit {

  currentMovie!: MovieServerSource;
  currentMovieDetail!: MovieDetail;
  currentMovieTitle: string = "chưa đặt tên";
  stars: number[] = [1, 2, 3, 4, 5];
  hoverIndex: number = -1;

  pageNumber: number[];
  episodes!: Movie[];
  seasons!: Movie[];
  relates!: Movie[];
  topHot!: Movie[];

  constructor(
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute
  ) {
    this.pageNumber = [1, 1, 1, 1];
  }
  // id trên thanh địa chỉ lệch 1 với danh sách tập không phải lỗi. nó là do id != index mảng
  ngOnInit(): void {
    const id: string | null = this.activateRoute.snapshot.paramMap.get("id");
    if (id) {
      this.initPageContent(Number(id)-1);
    }
  }

  initPageContent(movieId:number){
    // console.log("434id="+movieId);
    this.currentMovie = this.loadMovieById(movieId);
    this.currentMovieDetail = this.loadDetailById(movieId);
    this.currentMovieTitle = this.loadMovieTitle(movieId);
    this.episodes = this.loadEpisodes();
    this.seasons = this.loadSeason();
    this.relates = this.loadRelate();
    this.topHot = this.loadHotMovie();
  }

  loadMovieById(id: number): MovieServerSource {
    // console.log("445id="+id);
    const movie = movieServerSources[id];
    movie.link = this.sanitizer.bypassSecurityTrustResourceUrl(movie.link + "?autoplay=1");
    return movie;
  }

  loadDetailById(id: number): MovieDetail {
    return movieDetails[id];
  }

  loadMovieTitle(movieId: number): string {
    return movies[movieId].title;
  }

  loadEpisodes(): Movie[] {
    // console.log("460id="+this.currentMovie.idMovie);
    this.pageNumber[PageIndex.ForEpisode] = this.currentMovie.idMovie;
    
    const nextEpisode = [];
    let start = Math.floor(this.currentMovie.idMovie / 5) * 5;
    for (let end = start + 5; start < end; ++start) {
      nextEpisode.push(movies[start])
    }
    return nextEpisode;
  }

  loadSeason(): Movie[] {
    const hotMovie = [];
    for (let start = 0; start < 5; ++start) {
      hotMovie.push(movies[Math.floor(Math.random() * 19)])
    }
    return hotMovie;
  }

  loadRelate(): Movie[] {
    const hotMovie = [];
    for (let start = 0; start < 5; ++start) {
      hotMovie.push(movies[Math.floor(Math.random() * 19)])
    }
    return hotMovie;
  }

  loadHotMovie(): Movie[] {
    const hotMovie = [];
    for (let start = 0; start < 5; ++start) {
      hotMovie.push(movies[Math.floor(Math.random() * 19)])
    }
    return hotMovie;
  }

  decreasePageNumber(index: number) {
    this.pageNumber[index] -= 1;
  }
  increasePageNumber(index: number) {
    this.pageNumber[index] += 1;
  }
  enterStarListener(index: number) {
    this.hoverIndex = index;
  }

  leaveStarListener() {
    this.hoverIndex = this.currentMovieDetail.currentUserRate - 1;
  }
  selectStar(score: number) {
    this.currentMovieDetail.currentUserRate = score + 1;
    alert(score);
  }
}
