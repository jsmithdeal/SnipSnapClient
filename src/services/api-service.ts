import axios, { AxiosError, isAxiosError } from "axios";
import { API_URL, API_ENDPOINTS } from "../utilities/configVariables";
import type { CreateUserRequest, LoginRequest } from "../models/http/RequestModels";
import type APIResponse from "../models/http/APIResponse";
import Cookies from "js-cookie"

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

    //Log user in
    static async login(login: LoginRequest): Promise<APIResponse> {
        const url = API_URL + API_ENDPOINTS.login;
        
        try {
            const response = await axios.post(url, login, {
                "withCredentials": true
            });
            const csfrToken = Cookies.get("snipsnap_csfr");

            if (csfrToken == null || csfrToken == "")
                throw new AxiosError("Unauthorized", "401");

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

    //Check authenticated status if context is lost (refresh, page close, etc)
    static async checkAuth(): Promise<APIResponse> {
        const url = API_URL + API_ENDPOINTS.checkAuth;
        
        try {
            const csfrToken = Cookies.get("snipsnap_csfr");

            if (csfrToken == null || csfrToken == "")
                throw new AxiosError("Unauthorized", "401");
            
            const response = await axios.post(url, undefined, {
                "withCredentials": true,
                "headers": {
                    "snipsnap_csfr": csfrToken
                }
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
                console.log(error.message)
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