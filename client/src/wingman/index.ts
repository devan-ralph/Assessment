import { Reducer } from "react";
import apiClient from "../apiClient";
import { IAction, IpInfo, ValidIPType } from "../types/IP";

const getIPInfo = async (IP: string, dispatch: React.Dispatch<IAction>) => {
	try {
		await apiClient.get(`https://ipinfo.io/${IP}/geo`).then((value) => {
			dispatch({ type: "GetIPInfo", payload: value.data });
		});
	} catch (e) {
		const err = (e as Error).message;
		throw new Error(`Failed to fetch geolocation data: ${err}`);
	}
};
const resetUser = () => {
	document.cookie = "name=";
};
const storeUserCookie = (name: string) => {
	document.cookie = `name=${name}`;
};
const mapSource = (s: string) => {
	const loc = s.split(",");
	console.log(loc);

	const params = new URLSearchParams({ q: "San Pablo" });
	console.log(params);
	const u = `https://www.google.com/maps/embed/v1/view
  ?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
  &center=${loc}
  &maptype=roadmap`;
	// return `https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=${coordinates.x}, ${coordinates.y}&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed`;
	return u;
};
const IsValidIP = (IP: string) => {
	const IPv4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
	const IPv6Regex =
		/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

	return IPv4Regex.test(IP) || IPv6Regex.test(IP);
};
const deleteMe = (IPs: string[], removeThisIndex: number): string[] => {
	const updatedIPList = [];
	for (let index = 0; index < IPs.length; index++) {
		if (!(index === removeThisIndex)) {
			updatedIPList.push(IPs[index]);
		}
	}

	return updatedIPList;
};

const reducer: Reducer<ValidIPType, IAction> = (state: ValidIPType, action: IAction) => {
	switch (action.type) {
		case "setEnteredIP":
			return { ...state, enteredIP: action.payload as string };
		case "setValidIPs":
			return { ...state, validIPs: [...state.validIPs.map((e: string) => e), action.payload as string] };
		case "SetIsValidIP":
			return { ...state, isValidIP: action.payload as string };
		case "DeleteThisIP":
			return { ...state, validIPs: deleteMe(state.validIPs, action.payload as number) };
		case "GetIPInfo":
			return { ...state, IPInfo: action.payload as IpInfo };
		default:
			throw new Error();
	}
};

export { IsValidIP, mapSource, getIPInfo, reducer, resetUser, storeUserCookie };
