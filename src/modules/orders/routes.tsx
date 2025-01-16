import { RouteObject } from 'react-router-dom';
import Order from './screens/Order';
import OrderDetail from './screens/OrderDetail';

export enum OrderRoutesEnum {
    ORDER = '/order',
    ORDER_ID = '/order/id',
}

export const orderScreenRoutes: RouteObject[] = [
    {
        path: OrderRoutesEnum.ORDER,
        element: <Order />,
    },
    {
        path: OrderRoutesEnum.ORDER_ID,
        element: <OrderDetail />,
    },
];