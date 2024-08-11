import { Banner } from "./Banner.model";

export interface BannerData {
    totalElements: number;
    totalPages: number;
    size: number;
    content: Banner[];
}