import { useEffect, useState } from "react"
import { InsertProductDto } from "../../../shared/dtos/InsertProduct.dto"
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI"
import { URL_PRODUCT } from "../../../shared/constants/urls"
import { useNavigate } from "react-router-dom"
import { ProductRoutesEnum } from "../routes"
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer"

export const useInsertProduct = () => {
    const [loading, setLoading] = useState(false)
    const [disabledButton, setDisabledButton] = useState(true)
    const { setNotification } = useGlobalReducer()
    const navigate = useNavigate()

    const [product, setProduct] = useState<InsertProductDto>({
        name: '',
        price: 0,
        image: ''
    })

    useEffect(() => {
        if (product.name && product.image && product.categoryId && product.price > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [product])

    const handleChangeSelect = (value: string) => {
        setProduct({
            ...product,
            categoryId: Number(value)
        })
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, nameObject: string, isNumber?: boolean) => {
        setProduct({
            ...product,
            [nameObject]: isNumber ? Number(e.target.value) : e.target.value
        })
    }

    const handleInsertProduct = async () => {
        setLoading(true)
        await connectionAPIPost(URL_PRODUCT, product).then(() => {
            setNotification("Sucesso!", 'success', 'Produto inserido com sucesso.')
            navigate(ProductRoutesEnum.PRODUCT)
        }).catch((e: Error) => console.log(setNotification(e.message, 'error')))
        setLoading(false)
    }

    return {
        product,
        loading,
        disabledButton,
        onChangeInput,
        handleInsertProduct,
        handleChangeSelect,
    }
}
