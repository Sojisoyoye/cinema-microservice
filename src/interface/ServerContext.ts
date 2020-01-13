import { Response, Request } from 'express';

export interface ServerContext {
    req: Request;
    res: Response;
    payload?: {userId: string}; 
}