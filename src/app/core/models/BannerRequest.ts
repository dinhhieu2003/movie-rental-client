import { Banner } from "./Banner.model";
import { BannerData } from "./BannerData";

export interface BannerRequest {
    Message: string;
    Status: number;
    Data: BannerData;
}