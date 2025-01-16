import { useEffect } from "react"
import { useOrderReducer } from "../../../store/reducers/orderReducer/useOrderReducer"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_ORDER } from "../../../shared/constants/urls"

export const useOrderDetail = (orderId?: string) => {
    const { request, loading } = useRequests()
    const { order, setOrder } = useOrderReducer()

    useEffect(() => {
        if (!order) {
            request(`${URL_ORDER}/${orderId}`, MethodsEnum.GET, setOrder)
        }
    }, [])

    return { order, loading }

}

