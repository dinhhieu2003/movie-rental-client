export interface GenericRequest<anyType> {
    Message: string,
    Status: number,
    Data: anyType,
}