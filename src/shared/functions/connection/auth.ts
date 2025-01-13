import { UserType } from "../../../modules/login/types/UserType";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { URL_USER } from "../../constants/urls";
import { connectionAPIGet } from "./connectionAPI";
import { getItemStorage, removeItemStorage, setItemStorage } from "./storageProxy";

export const unSetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY)

export const setAuthorizationToken = (token: string) => {

    if (token) {
        setItemStorage(AUTHORIZATION_KEY, token)
    }

}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY)

export const verifyLoggedIn = async (setUser: (user: UserType) => void, user?: UserType) => {

    const token = getAuthorizationToken()

    if (!token) {
        location.href = '/login'
    }

    if (!user) {
        await connectionAPIGet<UserType>(URL_USER).then((userReturn) => {
            setUser(userReturn)
        }).catch(() => {
            unSetAuthorizationToken()
            location.href = '/login'
        })
    }

    console.log("entrou")
    return null
}
