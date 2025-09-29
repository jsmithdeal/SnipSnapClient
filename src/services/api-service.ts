import axios, { isAxiosError } from "axios";
import { API_URL, API_ENDPOINTS } from "../utilities/configVariables";
import type CreateUser from "../models/CreateUser";
import type APIResponse from "../models/APIResponse";

export default class APIService {
    //Creates new user
    static async createUser(user: CreateUser): Promise<APIResponse> {
        const url = API_URL + API_ENDPOINTS.createUser;
        
        try {
            const response = await axios.post(url, user);
            return {
                success: true,
                statusCode: response.status,
                message: "User created successfully."
            }
        }
        catch (error){
            if (isAxiosError(error)){
                return {
                    success: false,
                    statusCode: error.status,
                    message: error.response?.data?.detail || error.message
                };
            }

            return {
                success: false,
                statusCode: 500,
                message: "An unknown error occurred."
            };
        }
    }
}