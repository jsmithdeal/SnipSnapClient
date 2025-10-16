import axios, { AxiosError, isAxiosError } from "axios";
import { API_URL, API_ENDPOINTS, API_ACTIONS } from "../utilities/configVariables";
import type { CreateUserRequest, LoginRequest } from "../models/http/RequestModels";
import type APIResponse from "../models/http/APIResponse";
import Cookies from "js-cookie"

export default class APIService {
    //Creates new user
    static async createUser(user: CreateUserRequest): Promise<APIResponse> {
        return await this.makeRequest(API_ENDPOINTS.createUser, API_ACTIONS.post, false, user);
    }

    //Log user in
    static async login(login: LoginRequest): Promise<APIResponse> {
        return await this.makeRequest(API_ENDPOINTS.login, API_ACTIONS.post, false, login);
    }

    //Log user out
    static async logout(): Promise<APIResponse> {
        return await this.makeRequest(API_ENDPOINTS.logout, API_ACTIONS.post, false);
    }

    //Check authenticated status if context is lost (refresh, page close, etc)
    static async checkAuth(): Promise<APIResponse> {
        return await this.makeRequest(API_ENDPOINTS.checkAuth, API_ACTIONS.post, true);
    }

    //Get list of snips
    static async getSnips(): Promise<APIResponse> {
        return await this.makeRequest(API_ENDPOINTS.getSnips, API_ACTIONS.get, true);
    }

    //Get settings object
    static async getSettings(): Promise<APIResponse> {
        return await this.makeRequest(API_ENDPOINTS.getSettings, API_ACTIONS.get, true);
    }

    private static async makeRequest(endpoint: string, action: string, requiresAuth: boolean, payload?: object): Promise<APIResponse> {
        try {
            let csfrToken = undefined;
            let response = undefined;
            let config = {
                "withCredentials": true,
                "headers": {}
            };
            endpoint = API_URL + endpoint;

            if (requiresAuth){
                csfrToken = Cookies.get("snipsnap_csfr");

                if (csfrToken == null || csfrToken == "")
                    throw new AxiosError("Unauthorized", "401");

                config.headers = {
                    "snipsnap_csfr": csfrToken
                }
            }

            if (action.toUpperCase() == API_ACTIONS.post)
                response = await axios.post(endpoint, payload, config);
            else
                response = await axios.get(endpoint, config);

            if (endpoint == API_ENDPOINTS.login){
                csfrToken = Cookies.get("snipsnap_csfr")

                if (csfrToken == undefined || csfrToken == null || csfrToken == "")
                    throw new AxiosError("Unauthorized", "401");
            }
            
            return {
                success: true,
                statusCode: response.status,
                message: "Success",
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