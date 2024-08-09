import { Invoice } from "./Invoice.model";

export interface InvoiceRequest {
    Message: string,
    Status: number,
    Data: Invoice[],
}