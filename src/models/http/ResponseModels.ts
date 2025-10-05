import type { UserBase } from './BaseHTTPModels';

export interface UserResponse extends UserBase {
    userid: number;
}

export interface AuthenticatedResponse {
    csfrToken: string;
    user: UserResponse;
}