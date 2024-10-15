import { useReducer } from "react";
import AddIp from "../components/AddIp";
import IPInfoDisplay from "../components/IPInfoDisplay";
import Profile from "../components/Profile";
import { reducer } from "../wingman";

export default function Dashboard() {
	const [state, dispatch] = useReducer(reducer, {
		enteredIP: "",
		validIPs: [],
		isValidIP: "initial",
		IPInfo: null,
		mounted: false,
	});

	return (
		<section className="w-full ">
			<div className="w-3/4 mx-auto min-h-[500px] border-l-2 flex flex-row">
				<aside className=" w-1/4 h-auto">
					<Profile />
				</aside>
				<div className="w-2/4 h-auto bg-slate-500">
					<IPInfoDisplay state={state} />
				</div>
				<div className="w-1/4 h-auto">
					<AddIp state={state} dispatch={dispatch} />
				</div>
			</div>
		</section>
	);
}
