import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BACKEND_URL } from "./Api";


interface ApiConnectorProps{
    method : "get" | "put" | "delete" | "post" | "patch";
    url : string;
    body? : object;
    params? : object;
    headers? : object;
}

export const axiosInstance = axios.create({
    baseURL : BACKEND_URL
})

export const ApiConnector = async ({method,url,body,params,headers}:ApiConnectorProps) : Promise<AxiosResponse> => {
    try{
        const config : AxiosRequestConfig = {
            method,
            url,
            data : body || undefined,
            headers : headers || undefined,
            params  : params || undefined
        };

        const response = await axiosInstance(config);
        return response;
    }  
    catch(e){
        console.error("API call failed : ",e);
        throw e;
    }
}


