import { Badge, Descriptions, DescriptionsProps } from "antd";
import Screen from "../../../shared/components/screen/Screen"
import { OrderRoutesEnum } from "../routes";
import { useParams } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrderDetail";

const userData: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Nome',
        children: 'Cloud Database',
        span: 2,
    },
    {
        key: '2',
        label: 'Email',
        children: 'Prepaid',
        span: 2,
    },
    {
        key: '3',
        label: 'Telefone',
        children: 'YES',
        span: 2,
    },
    {
        key: '4',
        label: 'CPF',
        children: '2018-04-24 18:00:00',
        span: 2,
    },
    {
        key: '5',
        label: 'Usage Time',
        children: '2019-04-24 18:00:00',
        span: 2,
    },
    {
        key: '6',
        label: 'Status',
        children: <Badge status="processing" text="Running" />,
        span: 3,
    },
    {
        key: '7',
        label: 'Negotiated Amount',
        children: '$80.00',
    },
    {
        key: '8',
        label: 'Discount',
        children: '$20.00',
    },
    {
        key: '9',
        label: 'Official Receipts',
        children: '$60.00',
    },
    {
        key: '10',
        label: 'Config Info',
        children: (
            <>
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1
                <br />
            </>
        ),
    },
];

const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>()
    const { order } = useOrderDetail(orderId)

    console.log(order)

    return (
        <Screen listBreadcrumb={[
            {
                name: 'HOME',
            },
            {
                name: 'PEDIDOS',
                navigateTo: OrderRoutesEnum.ORDER,
            },
            {
                name: 'DETALHES DO PEDIDO',
            },
        ]}>
            <Descriptions title="Dados do usuário" bordered items={userData} />;
            <Descriptions title="Dados do pagamento" bordered items={userData} />;
            <Descriptions title="Dados do endereço" bordered items={userData} />;
            <Descriptions title="Produtos" bordered items={userData} />;
        </Screen>
    )
}

export default OrderDetail