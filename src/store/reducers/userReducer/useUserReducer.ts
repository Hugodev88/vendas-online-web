import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks"
import { UserType } from "../../../modules/login/types/UserType"
import { setUsersAction } from "."

export const useUserReducer = () => {
    const { users } = useAppSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const setUsers = (users: UserType[]) => {
        dispatch(setUsersAction(users))
    }

    return {
        users,
        setUsers
    }
}
