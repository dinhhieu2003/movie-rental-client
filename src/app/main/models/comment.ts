export interface Comment {
    commentId: number,
    imgURL: string,
    createAt: string,
    name: string,
    isMyComment: boolean,
    text:string,
}

export interface CommentData {
    commentId: string,
    imgURL: string,
    createdAt: string,
    userName: string,
    isMyComment: boolean,
    text:string,
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface CommentUserData {
    totalElements: number;
    totalPages: number;
    size: number;
    content: CommentData[];
    number: number;
    sort: Sort;
    numberOfElements: number;
    pageable: Pageable;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface CommentUserRequest {
    Message: string;
    Status: number;
    Data: CommentUserData;
}

export function getDefaultCommentData():CommentData{
    return {
        commentId: "",
        imgURL: "https://cdn.alongwalk.info/vn/wp-content/uploads/2022/10/14054104/image-100-y-tuong-avatar-cute-doc-dao-an-tuong-nhat-cho-ban-166567566414594.jpg",
        createdAt: "00/00/9999",
        userName: "someuser",
        isMyComment: false,
        text:"comment này siêu không thực",
    };
}
