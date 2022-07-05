import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
		} catch (error) {
			toast.error("Something went wrong please try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-center text-3xl mt-[20%]">Forgot Password</h2>

			{loading ? (
				<Spinner />
			) : (
				<form
					className="flex flex-col justify-center items-center mt-10"
					onSubmit={onSubmit}>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={onChange}
						placeholder="Please enter your email"
						className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
						required
					/>
					<button type="submit" className="btn">
						Submit
					</button>
				</form>
			)}
		</div>
	);
}

export default ForgotPassword;
