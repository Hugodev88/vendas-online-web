import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { loginRoutes } from "./modules/login/routes";
import { useNotification } from "./shared/hooks/useNotification";
import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { productScreenRoutes } from "./modules/product/routes";

const router = createBrowserRouter([...firstScreenRoutes, ...loginRoutes, ...productScreenRoutes]);

function App() {
	const { contextHolder } = useNotification()
	return (
		<>

			{contextHolder}
			<RouterProvider router={router} />

		</>
	)
}

export default App;