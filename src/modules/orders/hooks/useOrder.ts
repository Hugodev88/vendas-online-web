import { useEffect } from "react"
import { useOrderReducer } from "../../../store/reducers/orderReducer/useOrderReducer"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_ORDER_ALL } from "../../../shared/constants/urls"

export const useOrder = () => {
    const { request } = useRequests()
    const { orders, setOrders } = useOrderReducer()

    useEffect(() => {
        if (!orders || orders.length === 0) {
            request(URL_ORDER_ALL, MethodsEnum.GET, setOrders)
        }
    }, [])

    return { orders }

}

