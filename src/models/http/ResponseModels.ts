import type { ContactsBase, SnipBase, UserBase } from './BaseModels';

export interface UserResponse extends UserBase {
    
}

export interface SnipsResponse extends SnipBase {

}

export interface ContactsResponse extends ContactsBase {

}

export interface SettingsResponse extends UserBase {
    contacts: ContactsResponse[]
}