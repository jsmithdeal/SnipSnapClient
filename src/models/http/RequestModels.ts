import type { SnipBase, UserBase } from './BaseModels';

export interface CreateUserRequest extends UserBase  {
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SnipsRequest extends SnipBase {

}