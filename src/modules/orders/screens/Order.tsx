import { ColumnsType } from "antd/es/table"
import Screen from "../../../shared/components/screen/Screen"
import { useOrder } from "../hooks/useOrder"
import { OrderType } from "../../../shared/types/OrderType"
import Table from "../../../shared/components/table/Table"

const columns: ColumnsType<OrderType> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Data',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Usuário',
        dataIndex: 'user',
        key: 'user',
        sorter: (a, b) => a.user.name.localeCompare(b.user.name),
        render: (_, target) => <a>{target.user?.name}</a>
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
        name: 'PEDIDOS',
    },
]

const Order = () => {

    const { orders } = useOrder()
    return (
        <Screen listBreadcrumb={listBreadcrumb}>
            <Table columns={columns} dataSource={orders} />
        </Screen>
    )
}

export default Order