export default interface APIResponse {
    success: boolean;
    statusCode?: number;
    message?: string;
    data?: object;
}