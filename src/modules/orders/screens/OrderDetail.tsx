import { Descriptions, DescriptionsProps, Divider, Spin } from "antd";
import Screen from "../../../shared/components/screen/Screen"
import { OrderRoutesEnum } from "../routes";
import { useParams } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled";

const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>()
    const { order, loading } = useOrderDetail(orderId)

    console.log(order)

    console.log(order?.user.name);

    const userData: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Nome',
            children: `${order?.user.name}`,
            span: 2,
        },
        {
            key: '2',
            label: 'Email',
            children: `${order?.user.email}`,
            span: 2,
        },
        {
            key: '3',
            label: 'Telefone',
            children: `${order?.user.phone}`,
            span: 2,
        },
        {
            key: '4',
            label: 'CPF',
            children: `${order?.user.cpf}`,
            span: 2,
        },
    ]

    const paymentData: DescriptionsProps['items'] = [
        {
            key: '7',
            label: 'Preço',
            children: `${order?.payment?.price}`,
            span: 2,
        },
        {
            key: '8',
            label: 'Desconto',
            children: `${order?.payment?.discount}`,
            span: 2,
        },
        {
            key: '9',
            label: 'Preço final',
            children: `${order?.payment?.finalPrice}`,
            span: 2,
        },
        {
            key: '6',
            label: 'Status',
            children: `${order?.payment?.paymentStatus?.name}`,
            span: 2,
        },
        {
            key: '5',
            label: 'Tipo de pagamento',
            children: `${order?.payment?.type}`,
            span: 2,
        },
    ]

    const addressData: DescriptionsProps['items'] = [
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
            {!order || loading ? (<DisplayFlexJustifyCenter><Spin size="large"></Spin></DisplayFlexJustifyCenter>) :
                <>

                    <Descriptions title="Dados do usuário" bordered items={userData} />
                    <Divider />
                    <Descriptions title="Dados do pagamento" bordered items={paymentData} />
                    <Divider />
                    <Descriptions title="Dados do endereço" bordered items={addressData} />
                    <Divider />
                    <Descriptions title="Produtos" bordered items={userData} />
                </>
            }

        </Screen>
    )
}

export default OrderDetail