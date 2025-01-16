import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import { loginRoutes } from "./modules/login/routes";
import { useNotification } from "./shared/hooks/useNotification";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { productScreenRoutes } from "./modules/product/routes";
import { getAuthorizationToken, verifyLoggedIn } from "./shared/functions/connection/auth";
import { useRequests } from "./shared/hooks/useRequests";
import { useEffect } from "react";
import { URL_USER } from "./shared/constants/urls";
import { MethodsEnum } from "./shared/enums/methods.enum";
import { categoryScreenRoutes } from "./modules/category/routes";
import { useGlobalReducer } from "./store/reducers/globalReducer/useGlobalReducer";
import { orderScreenRoutes } from "./modules/orders/routes";

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [...firstScreenRoutes, ...orderScreenRoutes, ...categoryScreenRoutes, ...productScreenRoutes].map((route) => ({
	...route,
	loader: verifyLoggedIn
}))

const router = createBrowserRouter([...routes, ...routesLoggedIn]);

function App() {
	const { contextHolder } = useNotification();
	const { setUser } = useGlobalReducer();
	const { request } = useRequests()

	useEffect(() => {
		const token = getAuthorizationToken()
		if (token) {
			request(URL_USER, MethodsEnum.GET, setUser)
		}
	}, [])

	return (
		<>
			{contextHolder}
			<RouterProvider router={router} />
		</>
	)
}

export default App;