import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function GuessLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}
