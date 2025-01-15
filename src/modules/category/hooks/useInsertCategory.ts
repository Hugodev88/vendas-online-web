import { useEffect, useState } from "react"
import { useRequests } from "../../../shared/hooks/useRequests"
import { URL_CATEGORY } from "../../../shared/constants/urls"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { useNavigate } from "react-router-dom"
import { CategoryRoutesEnum } from "../routes"
import { useCategoryReducer } from "../../../store/reducers/categoryReducer/useCategoryReducer"

export const useInsertCategory = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [disabledButton, setDisabledButton] = useState(true)
    const { request } = useRequests()
    const { setCategories } = useCategoryReducer()
    const navigate = useNavigate()

    useEffect(() => {
        if (!name) {
            setDisabledButton(true)
        } else {
            setDisabledButton(false)
        }
    }, [name])

    const insertCategory = async () => {
        setLoading(true)
        await request(URL_CATEGORY, MethodsEnum.POST, undefined, { name })
        await request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        setLoading(false)
        navigate(CategoryRoutesEnum.CATEGORY)
    }

    const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return {
        name,
        disabledButton,
        handleOnChangeName,
        insertCategory,
        loading,
    }

}