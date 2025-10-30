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
    deleteAccount: "/deleteAccount",
    deleteContact: "/deleteContact/",
    createContact: "/createContact",
    getSnipDetails: "/getSnipDetails/",
    getSnipInit: "/getSnipInit"
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
        createsnip: "/userpages/createsnip",
        editsnip: "/userpages/editsnip/:snipid",
        settings: "/userpages/settings"
    }
}
export const SNIP_LANGUAGES = {
    plaintext: "Plain Text",
    cpp: "C++",
    csharp: "C#",
    go: "Go",
    html: "HTML",
    java: "Java",
    javascript: "JavaScript",
    json: "JSON",
    php: "PHP",
    python: "Python",
    rust: "Rust",
    sass: "SASS",
    sql: "SQL",
    xml: "XML"
}