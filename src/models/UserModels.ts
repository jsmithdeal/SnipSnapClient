export interface CreateUser {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

export interface GetUser {
    userid: number
    email: string;
    firstname: string;
    lastname: string;
}

export interface LoginUser {
    email: string;
    password: string;
}