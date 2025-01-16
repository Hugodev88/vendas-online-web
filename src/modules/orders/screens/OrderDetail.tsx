import { Descriptions, DescriptionsProps, Divider, Spin } from "antd";
import Screen from "../../../shared/components/screen/Screen"
import { OrderRoutesEnum } from "../routes";
import { useParams } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrderDetail";
import { DisplayFlexJustifyCenter } from "../../../shared/components/styles/display.styled";
import ListOrderProduct from "../components/ListOrderProduct";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { insertMaskInCpf } from "../../../shared/functions/cpf";
import { insertMaskInPhone } from "../../../shared/functions/phone";
import { insertMaskInCep } from "../../../shared/functions/cep";

const OrderDetail = () => {
    const { orderId } = useParams<{ orderId: string }>()
    const { order, loading } = useOrderDetail(orderId)

    console.log(order?.ordersProduct)

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
            children: `${order?.user.phone ? insertMaskInPhone(order.user.phone) : ''}`,
            span: 2,
        },
        {
            key: '4',
            label: 'CPF',
            children: `${order?.user.cpf ? insertMaskInCpf(order.user.cpf) : ''}`,
            span: 2,
        },
    ]

    const paymentData: DescriptionsProps['items'] = [
        {
            key: '7',
            label: 'Preço',
            children: `${convertNumberToMoney(order?.payment?.price || 0)}`,
            span: 2,
        },
        {
            key: '8',
            label: 'Desconto',
            children: `${convertNumberToMoney(order?.payment?.discount || 0)}`,
            span: 2,
        },
        {
            key: '9',
            label: 'Preço final',
            children: `${convertNumberToMoney(order?.payment?.finalPrice || 0)}`,
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
            label: 'Cidade',
            children: `${order?.address?.city?.name}`,
            span: 1,
        },
        {
            label: 'Estado',
            children: `${order?.address?.city?.state?.name}`,
            span: 1,
        },
        {
            label: 'Complemento',
            children: `${order?.address?.complement}`,
            span: 1,
        },
        {
            label: 'Número',
            children: `${order?.address?.numberAddress}`,
            span: 1,
        },
        {
            label: 'CEP',
            children: `${order?.address?.cep ? insertMaskInCep(order.address.cep) : ''}`,
            span: 1,
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
                    <ListOrderProduct ordersProduct={order.ordersProduct} />
                </>
            }

        </Screen>
    )
}

export default OrderDetail