export default function Profile() {
	return (
		<div className="w-full h-auto flex flex-col text-center">
			<div className="h-[120px] w-[120px] mx-auto rounded-full">
				<img src="https://api.dicebear.com/9.x/lorelei/svg?seed=Name" className="w-full h-full" alt="profile" />
			</div>
			<h2>Name</h2>
			<p>email</p>
		</div>
	);
}
