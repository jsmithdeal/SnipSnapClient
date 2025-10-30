import type { SnipBase, UserBase } from './BaseModels';

export interface SaveUserRequest extends UserBase {
    
}

export interface CreateUserRequest extends UserBase  {
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface CreateContactRequest {
    email: string
    displayname: string
}

export interface SaveSnipRequest extends SnipBase {
    snipcontent: string;
    lastmodified: Date;
    collectionid: number;
    sharedwith: number[];
}