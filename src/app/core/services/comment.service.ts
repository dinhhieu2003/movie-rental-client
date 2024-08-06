import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environments";
import { BaseResponse } from "../models/BaseResponse.model";
import { EditCommentRequest } from "../models/EditCommentRequest";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrl + "auth/comment/";
  constructor(private readonly httpClient: HttpClient) {

  }
  get10CommentsByFilmId(filmId: string, pageNumber: number): Observable<Comment[]> {
    const filmUrl = this.apiUrl + filmId;
    return this.httpClient.get<Comment[]>(filmUrl);
  }

  updateComment(commentId: string, newText: string): Observable<BaseResponse> {

    const userId = localStorage.getItem("IdUser");
    let url: string = this.apiUrl + "update/" + commentId;
    const body: EditCommentRequest = {
      isActive: true,
      isDeleted: false,
      text: newText,
      idUser: userId ? userId : "không có IdUser"
    }
    return this.httpClient.put<BaseResponse>(url, body);
  }

  deleteComment(commentId: string): Observable<BaseResponse> {
    let url: string = this.apiUrl + "delete/" + commentId;
    return this.httpClient.delete<BaseResponse>(url);
  }

  createComment(filmId: string, newText: string): Observable<BaseResponse> {
    let url: string = this.apiUrl + "create/" + filmId;
    const userId = localStorage.getItem("IdUser");
    const body: EditCommentRequest = {
      isActive: true,
      isDeleted: false,
      text: newText,
      idUser: userId ? userId : "không có IdUser"
    }
    return this.httpClient.post<BaseResponse>(url, body);
  }
}
