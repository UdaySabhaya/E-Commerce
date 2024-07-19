import { Request } from 'express';

export interface RequestExtends extends Request {
    id?: string
    user?:any
}