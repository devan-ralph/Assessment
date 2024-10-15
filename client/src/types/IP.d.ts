import IsValidIP from "../wingman/IsValidIP";

type IpInfo = {
	ip: string;
	hostname: string;
	city: string;
	region: string;
	country: string;
	loc: string;
	org: string;
	postal: string;
	timezone: string;
	readme: string;
};
type UserType = {
	name: string;
};
type ValidIPType = {
	enteredIP: string;
	validIPs: string[];
	isValidIP: string;
	IPInfo: IpInfo | null;
	mounted: boolean;
};
type IAction = { payload: string | number | IpInfo; type: string };

module.export = [IsValidIP, IpInfo, IAction, UserType];
