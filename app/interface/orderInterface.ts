export interface orderInterface{
    id?:number,
    amount?:number,
    description:string,
    isDelivered:boolean,
    orderBy: string,
    createdBy?: number,
    updatedBy?: number,
    couponCode?:string

}