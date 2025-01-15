import { useDispatch } from "react-redux"
import { setCategoriesAction } from "."
import { useAppSelector } from "../../hooks"
import { CategoryType } from "../../../shared/types/CategoryType"

export const useCategoryReducer = () => {
    const { categories } = useAppSelector((state) => state.categoryReducer)
    const dispatch = useDispatch()

    const setCategories = (categories: CategoryType[]) => {
        dispatch(setCategoriesAction(categories))
    }

    return {
        categories,
        setCategories
    }
}
