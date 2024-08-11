export interface FilmModel {
    createdAt: string; // Ngày tạo
    updatedAt: string; // Ngày cập nhật
    isActive: boolean; // Trạng thái hoạt động
    isDeleted: boolean; // Trạng thái đã xóa mềm
    subtitles: string[]; // Danh sách phụ đề
    narrations: string[]; // Danh sách lời kể
    comments: string[]; // Danh sách bình luận
    genres: string[]; // Danh sách thể loại
    Id: string; // ID của phim
    FilmName: string; // Tên phim
    FilmUrl: string; // URL của phim
    Description: string; // Mô tả phim
    ThumbnailUrl: string; // URL hình thu nhỏ
    TrailerUrl: string; // URL trailer
    ReleaseDate: string; // Ngày phát hành
    Duration: string; // Thời lượng phim
    Actors: string; // Danh sách diễn viên
    Director: string; // Đạo diễn
    Language: string; // Ngôn ngữ
    NumberOfViews: number; // Số lượt xem
    Rating: number; // Đánh giá
    Age: number; // Độ tuổi giới hạn
    Price: number; // Giá
    LimitTime?: string; // Thời gian giới hạn (nếu có)
}
