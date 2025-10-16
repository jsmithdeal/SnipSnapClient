export const APP_NAME = "SnipSnap";
export const API_URL = "http://localhost:8000"
export const API_ENDPOINTS = {
    createUser: "/create-user",
    login: "/login",
    checkAuth: "/checkAuth",
    logout: "/logout",
    getSnips: "/getSnips",
    getSettings: "/getSettings",
    saveUserInfo: "/saveUserInfo",
    deleteUser: "/deleteUser",
    deleteContact: "/deleteContact/",
    createContact: "/createContact"
}
export const API_ACTIONS = {
    post: "POST",
    get: "GET",
    patch: "PATCH",
    delete: "DELETE"
}
export const PAGE_ROUTES = {
    accesspages: {
        root: "/accesspages",
        login: "/accesspages/login",
        createaccount: "/accesspages/createaccount"
    },
    userpages: {
        root: "/userpages",
        snips: "/userpages/snips",
        settings: "/userpages/settings"
    }
}