import type { CollectionBase, ContactsBase, SnipBase, UserBase } from './BaseModels';

export interface UserResponse extends UserBase {
    
}

export interface SnipsResponse extends SnipBase {

}

export interface ContactsResponse extends ContactsBase {

}

export interface CollectionResponse extends CollectionBase {
    
}

export interface SettingsResponse extends UserBase {
    contacts: ContactsResponse[]
}

export interface SnipDetailsResponse extends SnipBase {
    snipcontent: string;
    collectionid: number;
    collections: CollectionResponse[];
    contacts: ContactsResponse[];
    sharedwith: number[];
}