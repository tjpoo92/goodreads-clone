import { supabase } from "../supabaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import GoogleSignIn from "../components/GoogleSignIn";

function SignIn() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { user, session, error } = await supabase.auth.signIn({
				email: email,
				password: password,
			});
			if (error) throw error;
			if (user) {
				navigate("/");
			}
		} catch (error) {
			toast.error("Something went wrong please try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col justify-center h-screen items-center">
			<h1 className="text-4xl">Sign In</h1>

			{loading ? (
				<Spinner />
			) : (
				<div className="">
					<form
						onSubmit={onSubmit}
						className="flex flex-col items-center justify-center">
						<input
							id="email"
							className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
							type="email"
							placeholder="Your email"
							value={email}
							onChange={onChange}
						/>

						<input
							id="password"
							className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
							type="password"
							placeholder="Your password"
							value={password}
							onChange={onChange}
						/>
						<button className="rounded bg-slate-200 m-3 p-2">Submit</button>
					</form>
					<hr />
					<GoogleSignIn />
					<hr />
					<Link to="/sign-up">Sign Up Instead</Link>
				</div>
			)}
		</div>
	);
}

export default SignIn;
