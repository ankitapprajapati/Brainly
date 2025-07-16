export const BACKEND_URL = "http://localhost:8080";

export const endPoints = {
    SIGN_IN : `${BACKEND_URL}/api/v1/user/signin`,
    SIGN_UP : `${BACKEND_URL}/api/v1/user/signup`,

    CREATE_CONTENT : `${BACKEND_URL}/api/v1/content/createContent`,
    EDIT_CONTENT : `${BACKEND_URL}/api/v1/content/editContent`,
    GET_CONTENT : `${BACKEND_URL}/api/v1/content/getAllContent`,
    DELETE_CONTENT : `${BACKEND_URL}/api/v1/content/deleteContent`,

    BRAIN_STATUS : `${BACKEND_URL}/api/v1/brain/status`,
    BRAIN_CREATE_LINK : `${BACKEND_URL}/api/v1/brain/share`,
    BRAIN_GET : `${BACKEND_URL}/api/v1/brain/:shareLink`,

    CREATE_TAG : `${BACKEND_URL}/api/v1/tag/createTag`,
    GET_TAG : `${BACKEND_URL}/api/v1/tag/getTag`,

    PROFILE : `${BACKEND_URL}/api/v1/profile`

}