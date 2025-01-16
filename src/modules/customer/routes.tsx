import { RouteObject } from 'react-router-dom';
import Customer from './screens/Customer';

export enum CustomerRoutesEnum {
    CLIENTS = '/clients'
}

export const customerScreenRoutes: RouteObject[] = [
    {
        path: CustomerRoutesEnum.CLIENTS,
        element: <Customer />,
    },
];