import { MouseEvent, useState } from "react";
import { IAction, ValidIPType } from "../types/IP";
import { getIPInfo, IsValidIP } from "../wingman";
import apiClient from "../apiClient";
import Toast from "./Toast";

interface AddIpProps {
	state: ValidIPType;
	dispatch: React.Dispatch<IAction>;
}
export default function AddIp({ state, dispatch }: AddIpProps) {
	const [indexesToDel, setIndexesToDel] = useState<number[]>([]);

	async function isValidIpAddress(e: MouseEvent<HTMLElement>) {
		e.preventDefault();
		if (IsValidIP(state.enteredIP)) {
			dispatch({ type: "SetIsValidIP", payload: "valid" });
			dispatch({ type: "setValidIPs", payload: state.enteredIP });
			dispatch({ type: "GetIPInfo", payload: state.enteredIP });
			getIPInfo(state.enteredIP, dispatch);
			apiClient.post("/ip/store", state.IPInfo);
		} else dispatch({ type: "SetIsValidIP", payload: "invalid" });
	}
	const handleOnCheck = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (e.target) {
			setIndexesToDel([...indexesToDel, index]);
			try {
				await apiClient.post("/delete", { ids: indexesToDel });
			} catch (error) {
				<Toast success={false} message={(error as Error).message} />;
			}
		}
	};
	return (
		<section>
			<div className="">
				<form className="flex justify-center">
					<p>IP:</p>
					<input
						type="text"
						id="location"
						value={state.enteredIP}
						className="border-2 ml-2"
						placeholder="Enter a valid IP address.."
						onChange={(e) => dispatch({ type: "setEnteredIP", payload: e.currentTarget.value })}
					/>
					<button onClick={isValidIpAddress} className="bg-slate-300">
						Add
					</button>
				</form>

				{state.isValidIP === "valid" && <p className="text-green-500">Valid IP address</p>}
				{state.isValidIP === "invalid" && <p className="text-red-500">not valid bitch</p>}
			</div>
			<div className="bg-slate-50 h-full overflow-y-scroll">
				<div className="w-full flex justify-center">
					<form>
						{state.validIPs.map((IP, index) => {
							return (
								<div className="bg-amber-50">
									<label className="w-3/5">{IP}</label>
									<input
										type="checkbox"
										name="IPItem"
										onChange={(e) => {
											handleOnCheck(e, index);
										}}
									/>
								</div>
							);
						})}
						{indexesToDel.length > 0 && <button className="bg-slate-600">Delete</button>}
					</form>
				</div>
			</div>
		</section>
	);
}
