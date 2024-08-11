import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments";
import { BaseResponse } from "../models/BaseResponse.model";
import { EditCommentRequest } from "../models/EditCommentRequest";
import { CommentData, CommentUserRequest } from "../../main/models/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrl;
  constructor(private readonly httpClient: HttpClient) {

  }
  get10CommentsByFilmId(filmId: string, pageNumber: number): Observable<CommentUserRequest> {
    const url = this.apiUrl + "auth/comment/user/"+filmId+"?page="+pageNumber+"&size=10";
    return this.httpClient.get<CommentUserRequest>(url);
  }

  updateComment(filmId:string,commentId: string, newText: string): Observable<BaseResponse> {

    const userId = localStorage.getItem("IdUser");
    let url: string = this.apiUrl + "comment/update/" + commentId;
    const body: EditCommentRequest = {
      Text: newText,
      IdUser: userId ? userId : "no id user found",
      FilmId: filmId
    }
    return this.httpClient.put<BaseResponse>(url, body);
  }

  deleteComment(commentId: string): Observable<BaseResponse> {
    let url: string = this.apiUrl + "comment/delete/" + commentId;
    return this.httpClient.delete<BaseResponse>(url);
  }

  createComment(filmId: string ,newText: string): Observable<BaseResponse> {
    let url: string = this.apiUrl + "comment/create";
    let userId = localStorage.getItem("IdUser");
    const body: EditCommentRequest = {
      Text: newText,
      IdUser: userId ? userId : "no id user found",
      FilmId: filmId
    }
    return this.httpClient.post<BaseResponse>(url, body);
  }
}
