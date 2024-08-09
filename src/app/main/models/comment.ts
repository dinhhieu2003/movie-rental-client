export interface Comment {
    commentId: number,
    imgURL: string,
    createAt: string,
    name: string,
    isMyComment: boolean,
    text:string,
}

export interface CommentRequest {
    commentId: string,
    imgURL: string,
    createAt: string,
    name: string,
    isMyComment: boolean,
    text:string,
}