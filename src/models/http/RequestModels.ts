import type { UserBase } from './BaseHTTPModels';

export interface CreateUserRequest extends UserBase  {
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}