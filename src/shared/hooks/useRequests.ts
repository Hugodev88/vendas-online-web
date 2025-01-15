import { useState } from 'react';
import ConnectionAPI, { connectionAPIPost, MethodType } from '../functions/connection/connectionAPI';
import { URL_AUTH } from '../constants/urls';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { NavigateFunction } from 'react-router-dom';
import { setAuthorizationToken } from '../functions/connection/auth';
import { AuthType } from '../../modules/login/types/AuthType';
import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';

export const useRequests = () => {
    const [loading, setLoading] = useState(false)
    const { setNotification, setUser } = useGlobalReducer()

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

    const authRequest = async (navigate: NavigateFunction, body: any): Promise<void> => {
        console.log('authRequest')
        // const navigate = useNavigate()
        console.log('navigate')
        setLoading(true)
        await connectionAPIPost<AuthType>(URL_AUTH, body)
            .then((result) => {
                setUser(result.user)
                setAuthorizationToken(result.accessToken)
                setNotification("Logado com sucesso.", "success")
                navigate(FirstScreenRoutesEnum.FIRST_SCREEN)
                // window.location.href = ProductRoutesEnum.PRODUCT 
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
    }
};
