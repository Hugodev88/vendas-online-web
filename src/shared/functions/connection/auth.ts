import { NavigateFunction, redirect } from "react-router-dom";
import { UserType } from "../../../modules/login/types/UserType";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { URL_USER } from "../../constants/urls";
import { connectionAPIGet } from "./connectionAPI";
import { getItemStorage, removeItemStorage, setItemStorage } from "./storageProxy";
import { LoginRoutesEnum } from "../../../modules/login/routes";
import { UserTokenType } from "../../types/UserTokenType";

export const unSetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY)

export const setAuthorizationToken = (token?: string) => {

    if (token) {
        console.log("Setting Authorization Token:", token);
        setItemStorage(AUTHORIZATION_KEY, token)
    }

}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY)

export const getUserInfoByToken = (): UserTokenType | undefined => {
    const token = getAuthorizationToken()
    const tokenSplit = token?.split('.')

    if (tokenSplit && tokenSplit.length > 1) {
        return JSON.parse(window.atob(tokenSplit[1]))
    }

    return undefined
}

export const verifyLoggedIn = async () => {

    const token = getAuthorizationToken()

    if (!token) {
        return redirect(LoginRoutesEnum.LOGIN)
    }
    const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
        unSetAuthorizationToken()
    })

    if (!user) {
        return redirect(LoginRoutesEnum.LOGIN)
    }

    return null
}

export const logout = (navigate: NavigateFunction) => {
    unSetAuthorizationToken()
    navigate(LoginRoutesEnum.LOGIN);
}
