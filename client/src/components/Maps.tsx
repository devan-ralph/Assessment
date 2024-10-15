import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Suspense } from "react";

const ComponentResize = () => {
	const map = useMap();

	setTimeout(() => {
		map.invalidateSize();
	}, 0);

	return null;
};

const Map = ({ coordinates }: { coordinates: string }) => {
	const _coordinates = coordinates ? coordinates.split(",") : "";
	const latitude: number = +_coordinates[0];
	const longitude: number = +_coordinates[1];

	return (
		<Suspense fallback={<>loading</>}>
			<MapContainer
				style={{
					height: "100%",
					width: "100%",
				}}
				center={[latitude, longitude]}
				attributionControl={true}
				zoom={8}
				minZoom={3}
				scrollWheelZoom={true}>
				<ComponentResize />
				<TileLayer
					// className={'ion-hide'}
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[latitude, longitude]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</Suspense>
	);
};

export default Map;
