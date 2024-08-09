import { Banner } from "./Banner.model";

export interface BannerRequest {
    Message: string,
    Status: number,
    Data: Banner[],
}