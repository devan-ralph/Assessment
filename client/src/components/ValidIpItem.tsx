interface ValidIpItemProps {
	key: number;
	validIP: string;
	removeLastValidIP: () => [];
}

const ValidIpItem = (props: ValidIpItemProps) => {
	return (
		<div key={props.key}>
			<p>{props.validIP}</p>
			<button onClick={props.removeLastValidIP}>&times;</button>
		</div>
	);
};

export default ValidIpItem;
