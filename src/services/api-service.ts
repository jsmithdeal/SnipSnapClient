import axios, { isAxiosError } from "axios";
import { API_URL, API_ENDPOINTS } from "../utilities/configVariables";
import type { CreateUserRequest, LoginRequest } from "../models/http/RequestModels";
import type APIResponse from "../models/APIResponse";

export default class APIService {
    //Creates new user
    static async createUser(user: CreateUserRequest): Promise<APIResponse> {
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

    static async login(login: LoginRequest): Promise<APIResponse> {
        const url = API_URL + API_ENDPOINTS.login;
        
        try {
            const response = await axios.post(url, login, {
                "withCredentials": true
            });
            return {
                success: true,
                statusCode: response.status,
                message: "User logged in successfully.",
                data: response.data
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