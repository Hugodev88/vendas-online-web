import { useEffect, useState } from "react"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_USER_ALL } from "../../../shared/constants/urls"
import { useUserReducer } from "../../../store/reducers/userReducer/useUserReducer"

export const useUser = () => {
    const { request, loading } = useRequests()
    const { users, setUsers } = useUserReducer()
    const [usersFiltered, setUsersFiltered] = useState(users)

    useEffect(() => {
        if (!users || users.length === 0) {
            request(URL_USER_ALL, MethodsEnum.GET, setUsers)
        }
    }, [])

    useEffect(() => {
        setUsersFiltered(users)
    }, [users])

    const handleOnChangeSearch = (value: string) => {
        if (!value) {
            setUsersFiltered([...users])
        } else {
            setUsersFiltered([...users.filter((user) => user.name.includes(value))])
        }
    }

    return { users: usersFiltered, loading, handleOnChangeSearch }

}

