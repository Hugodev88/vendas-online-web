import axios from 'axios';
import { useState } from 'react';
import { useGlobalContext } from './useGlobalContext';
import { connectionAPIPost } from '../functions/connection/connectionAPI';

export const useRequests = () => {
    const [loading, setLoading] = useState(false)
    const { setNotification } = useGlobalContext()

    const getRequest = async (url: string) => {
        setLoading(true)
        return await axios({
            method: "get",
            url: url

        })
            .then((result) => { return result.data })
            .catch((e) => { alert(e) })
    }

    const postRequest = async (url: string, body: any) => {
        setLoading(true)
        const returnData = await connectionAPIPost(url, body)
            .then((result) => {
                setNotification("Logado", "success")
                return result
            })
            .catch((error: Error) => {
                setNotification(error.message, "error")
            })
        setLoading(false)
        return returnData
    }

    return {
        loading,
        getRequest,
        postRequest
    }
};
