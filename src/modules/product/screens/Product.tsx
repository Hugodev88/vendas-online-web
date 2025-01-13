import { useEffect } from "react"
import { useDataContext } from "../../../shared/hooks/useDataContext"
import { useRequests } from "../../../shared/hooks/useRequests"
import { MethodsEnum } from "../../../shared/enums/methods.enum"
import { ProductType } from "../../../shared/types/ProductType"
import { URL_PRODUCT } from "../../../shared/constants/urls"
import { ColumnsType } from "antd/es/table"
import Table from "../../../shared/components/table/Table"
import CategoryColumn from "../components/CategoryColumn"
import TooltipImage from "../components/TooltipImage"

const columns: ColumnsType<ProductType> = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        render: (_, product) => <TooltipImage product={product} />
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        render: (_, product) => <CategoryColumn category={product.category} />
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