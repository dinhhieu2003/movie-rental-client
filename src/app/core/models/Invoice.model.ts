
import { FilmData } from "../../main/models/film";
import { PackageInfo } from "./PackageInfo.model";

export interface Invoice{
    id: string,
    issueDate: Date,
    films: FilmData[],
    packageInfo: PackageInfo,
    totalPrice: number;
    paymentStatus: string;
    userId: string;
}