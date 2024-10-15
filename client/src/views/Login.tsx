import { FormEvent, useRef, useState } from "react";
import Toast from "../components/Toast";
import { Navigate } from "react-router-dom";

import { storeUserCookie } from "../wingman";
import apiClient from "../apiClient";
function Login() {
	const [isError, setIsError] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [data, setData] = useState<{ name: string } | null>(null);
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const payload = {
			email: emailRef.current?.value,
			password: passwordRef.current?.value,
		};

		try {
			const res = await apiClient.post("/login", payload);
			if (res.status === 201) {
				setData(res.data);
				storeUserCookie(res.data.name);
				setIsSuccess(true);
			}
		} catch (error) {
			console.log((error as Error).message);
			setIsError(true);
		}
	}
	return (
		<section className=" w-full min-h-screen flex items-center justify-center">
			{data != null && <h1 className="text-gray-800 text-lg mb-4 font-semibold">Hello, {data?.name}</h1>}{" "}
			<form onSubmit={handleSubmit} className="flex flex-col justify-center w-72 bg-white p-8 rounded-md shadow-md">
				<label htmlFor="email" className="text-gray-700 mb-1 text-sm">
					Email:
				</label>
				<input
					ref={emailRef}
					type="email"
					name="email"
					placeholder="Email"
					className="bg-gray-50 border border-gray-300 rounded-md p-2 mb-4 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
				/>

				<label htmlFor="password" className="text-gray-700 mb-1 text-sm">
					Password
				</label>
				<input
					ref={passwordRef}
					type="password"
					name="password"
					placeholder="Password"
					className="bg-gray-50 border border-gray-300 rounded-md p-2 mb-6 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
				/>

				<button className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition duration-200">Login</button>
			</form>
			{isSuccess && (
				<>
					<Toast success={true} message={"You're in!"} />;
					<Navigate to="/dashboard" />
				</>
			)}
			{isError && (
				<>
					<Toast success={false} message={"Login again.."} />;
					<Navigate to="/login" />
				</>
			)}
		</section>
	);
}

export default Login;
