import { ValidIPType } from "../types/IP";
import Maps from "./Maps";
type IPInfoDisplayProps = {
	state: ValidIPType;
};

export default function IPInfoDisplay({ state }: IPInfoDisplayProps) {
	return (
		<section className="w-auto h-full">
			<div className="w-full h-5/6 bg-slate-100">{state.IPInfo?.loc != undefined && <Maps coordinates={state.IPInfo.loc} />}</div>

			<div className="w-full h-1/6 bg-red-100">
				{state.IPInfo != null && (
					<div className="flex flex-wrap h-auto w-10/12">
						<div className="flex flex-row">
							<span>IP : </span>
							<p>{state.IPInfo.ip}</p>
						</div>
						<div className="flex flex-row">
							<span>Hostname</span>
							<p>{state.IPInfo.hostname}</p>
						</div>
						<div className="flex flex-row">
							<span>City :</span>
							<p>{state.IPInfo.city}</p>
						</div>
						<div className="flex flex-row">
							<span>Region</span>
							<p>{state.IPInfo.region}</p>
						</div>
						<div className="flex flex-row">
							<span>Country</span>
							<p>{state.IPInfo.country}</p>
						</div>
						<div className="flex flex-row">
							<span>Loc :</span>
							<p>{state.IPInfo.loc}</p>
						</div>
						<div className="flex flex-row">
							<span>Org :</span>
							<p>{state.IPInfo.org}</p>
						</div>
						<div className="flex flex-row">
							<span>Time Zone</span>
							<p>{state.IPInfo.timezone}</p>
						</div>
						<div className="flex flex-row">
							<span>Postal</span>
							<p>{state.IPInfo.postal}</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
