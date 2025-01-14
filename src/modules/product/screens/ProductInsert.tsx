import { useEffect } from "react"
import Screen from "../../../shared/components/screen/Screen"
import { ProductRoutesEnum } from "../routes"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { URL_CATEGORY } from "../../../shared/constants/urls"
import { LimitedContainer } from "../styles/productInsert.style"
import Input from "../../../shared/components/inputs/input/input"
import Button from "../../../shared/components/buttons/button/button"
import { Select } from "antd"

const ProductInsert = () => {

    const { categories, setCategories } = useDataContext()
    const { request } = useRequests()

    useEffect(() => {
        if (categories.length === 0) {
            request(URL_CATEGORY, MethodsEnum.GET, setCategories)
        }
    }, [])

    const handleChange = () => {

    }

    return (
        <Screen listBreadcrumb={[
            {
                name: 'HOME',
            },
            {
                name: 'PRODUTOS',
                navigateTo: ProductRoutesEnum.PRODUCT
            },
            {
                name: 'INSERIR PRODUTO',
            },
        ]}>
            <LimitedContainer>
                <Input margin="0px 0px 16px 0" title="Nome" placeholder="Nome" />
                <Input margin="0px 0px 16px 0" title="Url imagem" placeholder="Url imagem" />
                <Input margin="0px 0px 16px 0" title="Preço" placeholder="Preço" />
                <Select
                    defaultValue=""
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={
                        categories.map((category) => ({
                            value: `${category.id}`,
                            label: `${category.name}`,
                        }))
                    }
                />
                <Button type="primary">Inserir Produto</Button>
            </LimitedContainer>
        </Screen>
    )
}

export default ProductInsert