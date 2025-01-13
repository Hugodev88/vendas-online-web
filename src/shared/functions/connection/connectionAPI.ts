import axios, { AxiosRequestConfig } from "axios";
import { MethodsEnum } from "../../enums/methods.enum";
import { ERROR_ACESS_DANIED, ERROR_CONECTION } from "../../constants/errosStatus";
import { getAuthorizationToken } from "./auth";

export type MethodType = 'get' | 'post' | 'delete' | 'patch' | 'put';

export default class ConnectionAPI {

    static async call<T>(url: string, method: MethodType, body?: Object): Promise<T> {
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: getAuthorizationToken(),
                "Content-Type": "application/json"
            }
        }

        switch (method) {
            case MethodsEnum.POST:
            case MethodsEnum.PUT:
            case MethodsEnum.PATCH:
                return (await axios[method]<T>(url, body, config)).data;
            case MethodsEnum.GET:
            case MethodsEnum.DELETE:
            default:
                return (await axios[method]<T>(url, config)).data;

        }
    }

    static async connect<T>(url: string, method: MethodType, body?: Object): Promise<T> {
        return ConnectionAPI.call<T>(url, method, body).catch((e) => {
            if (e.response) {
                switch (e.response.status) {
                    case 401:
                    case 403:
                        throw new Error(ERROR_ACESS_DANIED)

                    default:
                        throw new Error(ERROR_CONECTION)
                }
            }
            throw new Error(ERROR_CONECTION)
        })
    }

}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.GET)
}

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.DELETE)
}

export const connectionAPIPost = async <T>(url: string, body: Object): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.POST, body)
}

export const connectionAPIPatch = async <T>(url: string, body: Object): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.PATCH, body)
}

export const connectionAPIPut = async <T>(url: string, body: Object): Promise<T> => {
    return ConnectionAPI.connect(url, MethodsEnum.PUT, body)
}
