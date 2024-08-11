import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../core/services/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentData, getDefaultCommentData } from '../../models/comment';
import { FilmService } from '../../../core/services/film.service';
import { getDefaultMovieCard, MovieCard } from '../../models/movie-card';
import { FilmData, FilmInfo, FilmResource, getDefaultFilmData } from '../../models/film';

enum PageIndex {
  ForEpisode,
  ForSeason,
  ForRelate,
  ForComment,
}

@Component({
  selector: 'app-film-streaming',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './film-streaming.component.html',
  styleUrl: './film-streaming.component.css'
})
export class FilmStreamingComponent {
  comments!: CommentData[];
  readonlyFields: boolean[];
  newComment!: CommentData;
  deleteCommentIndex: number = -1;
  stars: number[] = [1, 2, 3, 4, 5];
  hoverIndex: number = -1;
  pageNumber: number[];
  MaxPageNumber: number[];
  filmInfo !: FilmInfo;
  filmResource !: FilmResource;
  filmActors !: string[];
  filmGenres !: string[];
  currentFilmId: string = "no id found";
  topHot !: MovieCard[];
  constructor(
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private filmService: FilmService
  ) {
    this.pageNumber = Array<number>(5).fill(1);
    this.MaxPageNumber = Array<number>(5).fill(10);
    this.readonlyFields = Array<boolean>(10).fill(true);
    this.comments = Array.from({ length: 10 }, () => ({ ...getDefaultCommentData() }));
    this.newComment = this.getNewCommentDeffault();
    this.setDefaultValue();
    const id: string | null = this.activateRoute.snapshot.paramMap.get("id");
    if (id) {
      this.currentFilmId = id;
    }
    this.topHot = Array.from({ length: 5 }, () => ({ ...getDefaultMovieCard() }));
    this.getDataFromServer()
  }

  setDefaultValue(): void {
    const filmData = getDefaultFilmData();
    this.filmResource.FilmUrl = filmData.FilmUrl;
    this.filmInfo.FilmName = filmData.FilmName;
    this.filmInfo.TrailerUrl = filmData.TrailerUrl;
    this.filmActors = filmData.Actors;

  }

  async getDataFromServer() {
    this.getFilmInfoFromServer();
    this.getFilmResourceFromServer();
    this.getFilmGenresFromServer();
    this.getFilmActorsFromServer();
    this.getCommentsFromServer();
    this.getRatingFromServer();
    this.getTop5Film();
  }

  toggleEditMode(index: number): void {
    this.readonlyFields[index] = !this.readonlyFields[index];
    if (this.readonlyFields[index] === true) {
      this.comments[index].text = this.comments[index].text.replaceAll('\n', "  ");
      this.commentService.updateComment(this.currentFilmId, this.comments[index].commentId, this.comments[index].text);
    }

  }
  changePageNumber(index: number, amount: number) {
    const nextPage = this.pageNumber[index] + amount;

    if (1 <= nextPage && nextPage <= this.MaxPageNumber[index]) {
      this.pageNumber[index] = nextPage;

      console.log(this.pageNumber[index]);

      switch (index) {
        case PageIndex.ForComment:
          this.getCommentsFromServer();
          break;

        default:
          break;
      }
    }
  }

  enterStarListener(index: number) {
    this.hoverIndex = index;
  }
  leaveStarListener() {
    this.hoverIndex = this.filmInfo.RatingScore - 1;
  }
  selectStar(score: number) {
    this.filmService.setRatingForFilm(this.currentFilmId, score + 1);
  }
  sendCommentToServer(): void {
    if (containsVietnameseChars(this.newComment.text) === false) {
      return;
    }
    this.comments.unshift(...this.comments.splice(-1));
    this.comments[0] = { ...this.newComment };
    this.commentService.createComment(this.currentFilmId, this.newComment.text).subscribe({
      next: (response) => {
        this.pageNumber[PageIndex.ForComment] = 1;
        this.commentService.get10CommentsByFilmId(this.currentFilmId, 0)
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.newComment.text = "";

  }
  deleteComment(): void {

    let i = this.deleteCommentIndex;
    const tempComment: CommentData = this.comments[i];
    for (let length = this.comments.length; i < length - 1; ++i) {
      this.comments[i] = this.comments[i + 1];
    }
    this.comments[i] = tempComment;

    this.commentService.deleteComment(this.comments[i].commentId).subscribe({
      next: (response) => {
        console.log(response);


      },
      error: (error) => {
        console.error(error);
      }
    });
    tempComment.commentId = "";
    this.closeModal();
  }
  openModal(index: number): void {
    this.deleteCommentIndex = index;
  }

  closeModal(): void {
    this.deleteCommentIndex = -1;
  }
  getNewCommentDeffault(): CommentData {
    const userName = localStorage.getItem("FullName");
    return {
      commentId: "66b5e3c76d4d8759d90f8ab9",
      createdAt: "00/00/00",
      imgURL: "https://i.pinimg.com/474x/3f/3a/d1/3f3ad18a365a1668940d93b6cfc20591.jpg",
      isMyComment: true,
      userName: userName ? userName : "current user",
      text: ""
    };
  }
  getCommentsFromServer() {

    this.commentService.get10CommentsByFilmId(this.currentFilmId, this.pageNumber[PageIndex.ForComment] - 1).subscribe({
      next: (response) => {
        this.MaxPageNumber[PageIndex.ForComment] = response.Data.totalPages;

        let i = 0;
        for (let commentSFromServer: CommentData[] = response.Data.content; i < commentSFromServer.length; ++i) {
          this.comments[i].commentId = commentSFromServer[i].commentId;
          this.comments[i].createdAt = commentSFromServer[i].createdAt;
          this.comments[i].imgURL = commentSFromServer[i].imgURL;
          this.comments[i].isMyComment = commentSFromServer[i].isMyComment;
          this.comments[i].userName = commentSFromServer[i].userName;
          this.comments[i].text = commentSFromServer[i].text;
        }
        while (i < 10) {
          this.comments[i].commentId = "";
          ++i;
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getFilmDataFromServer(): void {

    // const id: string | null = this.activateRoute.snapshot.paramMap.get("id");

    // if (id) {
    //   this.filmService.getFilmById(id).subscribe({
    //     next: (response) => {

    //       this.filmData = { ...response.Data };

    //     },
    //     error: (error) => {
    //       console.error(error);
    //     }
    //   });
    // }
  }
  getRatingFromServer(): void {
    this.filmService.getFilmRating(this.currentFilmId).subscribe({
      next: (response) => {
        this.filmInfo.RatingScore = response.Data;
        this.selectStar(response.Data);
        this.leaveStarListener();

      },
      error: (error) => {
        console.error(error);
      }
    });

  }
  getTop5Film(): void {
    this.filmService.getTop5HotestFilm().subscribe({
      next: (response) => {
        this.topHot = response.Data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getFilmInfoFromServer(): void {
    this.filmService.getFilmInfo(this.currentFilmId).subscribe({
      next: (response) => {
        this.filmInfo = response.Data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getFilmGenresFromServer(): void {
    this.filmService.getFilmGenres(this.currentFilmId).subscribe({
      next: (response) => {
        this.filmGenres = response.Data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getFilmActorsFromServer(): void {
    this.filmService.getFilmActors(this.currentFilmId).subscribe({
      next: (response) => {
        this.filmActors = response.Data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getFilmResourceFromServer(): void {
    this.filmService.getFilmResource(this.currentFilmId).subscribe({
      next: (response) => {
        this.filmResource = response.Data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

function containsVietnameseChars(input: string): boolean {
  // Kiểm tra các ký tự ASCII và các ký tự đặc trưng của Tiếng Việt
  const vietnameseCharRegex = /[\u0000-\u007F\u0100-\u024F\u1EA0-\u1EFF\u0300-\u036F]/;
  return vietnameseCharRegex.test(input);
}
