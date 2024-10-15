import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="w-full min-h-14 flex">
			<div className="flex flex-row justify-between w-3/4 m-auto h-full border-b-2 pb-1">
				<NavLink to="/">Dashboard</NavLink>

				<div className="flex flex-row justify-between gap-10">
					<NavLink to="/">About</NavLink>
					<NavLink to="/login">Login</NavLink>
				</div>
			</div>
		</nav>
	);
}
