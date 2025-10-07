import type { UserBase } from './BaseModels';

export interface UserResponse extends UserBase {
    userid: number;
}