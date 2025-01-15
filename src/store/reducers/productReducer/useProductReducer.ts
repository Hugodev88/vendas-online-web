import { useDispatch } from "react-redux"
import { setProductsAction } from "."
import { ProductType } from "../../../shared/types/ProductType"
import { useAppSelector } from "../../hooks"

export const useProductReducer = () => {
    const { products } = useAppSelector((state) => state.productReducer)
    const dispatch = useDispatch()


    const setProducts = (products: ProductType[]) => {
        dispatch(setProductsAction(products))
    }

    return {
        products,
        setProducts
    }
}
