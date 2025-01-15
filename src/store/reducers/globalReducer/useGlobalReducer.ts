import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks"
import { setNotificationAction, setUserAction } from "."
import { NotificationEnum } from "../../../shared/types/NotificationType"
import { UserType } from "../../../modules/login/types/UserType"

export const useGlobalReducer = () => {
    const { user, notification } = useAppSelector((state) => state.globalReducer)
    const dispatch = useDispatch()

    const setNotification = (message: string, type: NotificationEnum, description?: string) => {
        dispatch(setNotificationAction({
            message,
            type,
            description
        })
        )
    }

    const setUser = (user: UserType) => {
        dispatch(setUserAction(user))
    }

    return {
        setNotification,
        setUser,
        user,
        notification,
    }
}
