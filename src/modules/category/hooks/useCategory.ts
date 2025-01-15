import { useEffect, useState } from "react"
import { useRequests } from "../../../shared/hooks/useRequests"
import { URL_CATEGORY } from "../../../shared/constants/urls"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { useCategoryReducer } from "../../../store/reducers/categoryReducer/useCategoryReducer"

export const useCategory = () => {
    const { categories, setCategories } = useCategoryReducer()
    const [categoriesFiltered, setCategoriesFiltered] = useState(categories)
    const { request } = useRequests()

    useEffect(() => {
        if (!categories || categories.length === 0) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        }
    }, [])

    useEffect(() => {
        setCategoriesFiltered([...categories])
    }, [categories])

    const handleOnChangeSearch = (value: string) => {
        if (!value) {
            setCategoriesFiltered([...categories])
        } else {
            setCategoriesFiltered([...categories.filter((category) => category.name.toUpperCase().includes(value.toUpperCase()))])
        }
    }

    return {
        categories: categoriesFiltered,
        handleOnChangeSearch,
    }

}