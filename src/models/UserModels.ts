interface UserBase {
    email: string;
    firstname: string;
    lastname: string;
}

export interface CreateUser extends UserBase  {
    password: string;
}

export interface GetUser extends UserBase {
    userid: number;
}

export interface GetAuthUser {
    token: string;
    user: GetUser
}

export interface LoginUser {
    email: string;
    password: string;
}