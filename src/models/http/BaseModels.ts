export interface UserBase {
    email: string;
    firstname: string;
    lastname: string;
}

export interface SnipBase {
    snipid: number;
    snipname: string;
    sniplanguage: string;
    snipdescription: string;
}

export interface ContactsBase {
    userid: number
    contactid: number
    displayname: string
}

export interface CollectionBase {
    collectionname: string;
    collectionid: number;
}