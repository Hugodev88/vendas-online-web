import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks"
import { setOrdersAction } from "."
import { OrderType } from "../../../shared/types/OrderType"

export const useOrderReducer = () => {
    const { orders } = useAppSelector((state) => state.orderReducer)
    const dispatch = useDispatch()

    const setOrders = (orders: OrderType[]) => {
        dispatch(setOrdersAction(orders))
    }

    return {
        setOrders,
        orders,
    }
}
