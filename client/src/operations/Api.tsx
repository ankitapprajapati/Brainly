export const BACKEND_URL = "http://localhost:8080";

export const endPoints = {
    SIGN_IN : `${BACKEND_URL}/api/v1/user/signin`,
    SIGN_UP : `${BACKEND_URL}/api/v1/user/signup`,

    CREATE_CONTENT : `${BACKEND_URL}/api/v1/content/createContent`,
    EDIT_CONTENT : `${BACKEND_URL}/api/v1/content/editContent`,
    GET_CONTENT : `${BACKEND_URL}/api/v1/content/getAllContent`,
    DELETE_CONTENT : `${BACKEND_URL}/api/v1/content/deleteContent`,
}