import axios from "axios";
import { API_URL, API_ENDPOINTS } from "../configVariables";
import type CreateUser from "../models/CreateUser";

export default class APIService {
    //TODO: HANDLE RETURNS FOR BOTH ERRORS AND OK
    static async createUser(user: CreateUser){
        const url = API_URL + API_ENDPOINTS.createUser;
        await axios.post(url, user);
    }
}