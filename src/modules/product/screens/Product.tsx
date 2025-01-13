import { useEffect } from "react"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { ProductType } from "../types/ProductType"
import { URL_PRODUCT } from "../../../shared/constants/urls"
import { ColumnsType } from "antd/es/table"
import Table from "../../../shared/components/table/Table"

const columns: ColumnsType<ProductType> = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (text) => <a>{text}</a>
    },
]


const Product = () => {

    const { products, setProducts } = useDataContext()
    const { request } = useRequests()

    useEffect(() => {
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts)
    }, [])

    return <Table columns={columns} dataSource={products} />

}

export default Product