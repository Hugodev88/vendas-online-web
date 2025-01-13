import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import ConnectionAPI, { connectionAPIPost, MethodType } from '../functions/connection/connectionAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { useNavigate } from 'react-router-dom';
import { ProductRoutesEnum } from '../../modules/product/routes';
import { setAuthorizationToken } from '../functions/connection/auth';
import { AuthType } from '../../modules/login/types/AuthType';

export const useRequests = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setNotification, setUser } = useGlobalContext()

    const request = async <T>(url: string, method: MethodType, saveGlobal?: (object: T) => void, body?: any): Promise<T | undefined> => {

        setLoading(true)
        const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
            .then((result) => {
                if (saveGlobal) {
                    saveGlobal(result)
                }
                return result
            })
            .catch((error: Error) => {
                setNotification(error.message, "error")
                return undefined
            })
        setLoading(false)
        return returnObject
    }

    const postRequest = async <T>(url: string, body: any): Promise<T | undefined> => {
        setLoading(true)
        const returnData = await connectionAPIPost<T>(url, body)
            .then((result) => {
                setNotification("Sucesso", "success")
                return result
            })
            .catch((error: Error) => {
                setNotification(error.message, "error")
                return undefined
            })
        setLoading(false)
        return returnData
    }

    const authRequest = async (body: any): Promise<void> => {
        setLoading(true)
        await connectionAPIPost<AuthType>(URL_AUTH, body)
            .then((result) => {
                setUser(result.user)
                setAuthorizationToken(result.accessToken)
                setNotification("Logado com sucesso.", "success")
                navigate(ProductRoutesEnum.PRODUCT)
                return result
            })
            .catch(() => {
                setNotification(ERROR_INVALID_PASSWORD, "error")
                return undefined
            })
        setLoading(false)
    }

    return {
        loading,
        authRequest,
        request,
        postRequest
    }
};
