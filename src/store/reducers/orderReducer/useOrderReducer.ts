import { useDispatch } from "react-redux"
import { useAppSelector } from "../../hooks"
import { setOrderAction, setOrdersAction } from "."
import { OrderType } from "../../../shared/types/OrderType"

export const useOrderReducer = () => {
    const { orders, order } = useAppSelector((state) => state.orderReducer)
    const dispatch = useDispatch()

    const setOrders = (orders: OrderType[]) => {
        dispatch(setOrdersAction(orders))
    }

    const setOrder = (order: OrderType) => {
        dispatch(setOrderAction(order))
    }

    return {
        setOrders,
        setOrder,
        orders,
        order,
    }
}
