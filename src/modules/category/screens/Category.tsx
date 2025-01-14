import { ColumnsType } from "antd/es/table"
import Screen from "../../../shared/components/screen/Screen"
import Table from "../../../shared/components/table/Table"
import { CategoryType } from "../../../shared/types/CategoryType"
import { useCategory } from "../hooks/useCategory"
import { LimitedContainer } from "../../../shared/components/styles/limited.styled"
import Search from "antd/es/input/Search"
import Button from "../../../shared/components/buttons/button/button"
import { useNavigate } from "react-router-dom"
import { CategoryRoutesEnum } from "../routes"
import { DisplayFlexJustifyBetween } from "../../../shared/components/styles/display.styled"

const columns: ColumnsType<CategoryType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Produtos',
        dataIndex: 'amountProducts',
        key: 'amountProducts',
        render: (text) => <a>{text}</a>,
    },

]

const listBreadcrumb = [
    {
        name: 'HOME',
    },
    {
        name: 'CATEGORIAS',
    },
]

const Category = () => {
    const { categories } = useCategory()
    const navigate = useNavigate()

    const handleOnClickCategory = () => {
        navigate(CategoryRoutesEnum.CATEGORY_INSERT)
    }

    const handleOnSearch = (value: string) => {

    }

    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
                <LimitedContainer width={240}>
                    <Search placeholder="Buscar categoria" onSearch={handleOnSearch} enterButton />
                </LimitedContainer>
                <LimitedContainer width={120}>
                    <Button type="primary" onClick={handleOnClickCategory}>Inserir</Button>
                </LimitedContainer>
            </DisplayFlexJustifyBetween>
            <Table columns={columns} dataSource={categories} />
        </Screen>
    )
}

export default Category