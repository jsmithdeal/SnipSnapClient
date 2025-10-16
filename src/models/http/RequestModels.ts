import type { UserBase } from './BaseModels';

export interface CreateUserRequest extends UserBase  {
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SaveUserRequest extends UserBase {
    
}

export interface CreateContactRequest {
    email: string
    displayname: string
}