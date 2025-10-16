import type { UserBase } from './BaseModels';

export interface CreateUserRequest extends UserBase  {
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}