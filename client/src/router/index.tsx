import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import DefaultLayout from "../layout/DefaultLayout";
import GuessLayout from "../layout/GuessLayout";
import Login from "../views/Login";
import Signup from "../views/Signup";
const router = createBrowserRouter([
	{
		path: "/",
		element: <GuessLayout />,

		children: [
			{ path: "/login", element: <Login /> },
			{ path: "/register", element: <Signup /> },
		],
	},
	{
		path: "/",
		element: <DefaultLayout />,

		children: [{ path: "/", element: <Dashboard /> }],
	},
]);

export default router;
