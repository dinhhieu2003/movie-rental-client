import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../core/services/comment.service';
import { VideoStreamingService } from '../../../core/services/video-streaming.service';
import { CommentRequest } from '../../models/comment';
import { FilmData } from '../../../core/models/FilmServer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  comments!: CommentRequest[];
  readonlyFields: boolean[];
  newComment!: CommentRequest;
  deleteCommentIndex: number = -1;
  stars: number[] = [1, 2, 3, 4, 5];
  hoverIndex: number = -1;
  pageNumber: number[];
  filmData!: FilmData;
  currentUserRate: number = -1;
  constructor(
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private filmService: VideoStreamingService
  ) {
    this.pageNumber = Array<number>(5).fill(1);
    this.readonlyFields = Array<boolean>(10).fill(true);
    this.newComment = this.getNewCommentDeffault();
    this.getFilmDataFromServer();
  }
  toggleEditMode(index: number): void {
    this.readonlyFields[index] = !this.readonlyFields[index];
    if (this.readonlyFields[index] === true) {
      this.comments[index].text = this.comments[index].text.replaceAll('\n', "  ");
      this.commentService.updateComment(this.comments[index].commentId, this.comments[index].text);
    }

  }
  decreasePageNumber(index: number) {
    if (this.pageNumber[index] > 1) {
      this.pageNumber[index] -= 1;
    }
  }
  increasePageNumber(index: number) {
    this.pageNumber[index] += 1;
  }
  enterStarListener(index: number) {
    this.hoverIndex = index;
  }
  leaveStarListener() {
    this.hoverIndex = this.currentUserRate - 1;
  }
  selectStar(score: number) {
    alert(score + 1);
    // api cập nhật rating
  }
  sendCommentToServer(): void {

    this.comments.unshift(...this.comments.splice(-1));
    this.comments[0] = { ...this.newComment };
    this.commentService.createComment(this.filmData.id, this.newComment.text);
    this.newComment.text = "";

  }
  deleteComment(): void {

    let i = this.deleteCommentIndex;
    const tempComment: CommentRequest = this.comments[i];
    for (let length = this.comments.length; i < length - 1; ++i) {
      this.comments[i] = this.comments[i + 1];
    }

    this.comments[i] = tempComment;
    tempComment.commentId = "";
    this.commentService.deleteComment(this.comments[i].commentId)
    this.closeModal();
  }
  openModal(index: number): void {
    this.deleteCommentIndex = index;
  }

  closeModal(): void {
    this.deleteCommentIndex = -1;
  }
  getNewCommentDeffault(): CommentRequest {
    return {
      commentId: "not a real id",
      createAt: "00/00/00",
      imgURL: "https://i.pinimg.com/474x/3f/3a/d1/3f3ad18a365a1668940d93b6cfc20591.jpg",
      isMyComment: true,
      name: "currentuser",
      text: ""
    };
  }
  getFilmDataFromServer(): void {
    const id: string | null = this.activateRoute.snapshot.paramMap.get("id");

    if (id) {
      this.filmService.getFilmById(id).subscribe({
        next: (response) => {
          console.log(response);

          this.filmData = { ...response.Data };
          return
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    else {
      this.filmData = {
        isActive: false,
        isDeleted: false,
        createdAt: '11/11/1111',
        updatedAt: '22/22/2222',
        id: 'superid',
        FilmName: 'không có tên',
        filmUrl: '',
        description: 'phim hỏng rồi qua web nước ngoài mà coi',
        thumbnailUrl: '',
        trailerUrl: '',
        releaseDate: '00/00/9999',
        duration: '',
        actors: '',
        director: '',
        language: '',
        numberOfViews: -9999999,
        rating: 5,
        age: 0,
        rentalType: '',
        price: 0,
        limitTime: 0,
        subtitles: [],
        narrations: [],
        comments: [],
        genres: []
      };
    }
  }
}

