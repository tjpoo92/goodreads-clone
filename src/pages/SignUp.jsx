import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

//TODO: show password

function SignUp() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = formData;
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
			const { user, session, error } = await supabase.auth.signUp(
				{ email: email, password: password },
				{ data: { name: name } }
			);
			if (error) throw error;
		} catch (error) {
			toast.error("Something went wrong with registration");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="row flex flex-center">
			<div className="col-6 form-widget" aria-live="polite">
				<h1 className="header">Supabase + React</h1>
				<p className="description">
					Sign in via magic link with your email below
				</p>
				{loading ? (
					"Sending magic link..."
				) : (
					<form onSubmit={onSubmit}>
						<label htmlFor="email">Name</label>
						<input
							id="name"
							className="inputField"
							type="text"
							placeholder="Your name"
							value={name}
							onChange={onChange}
						/>
						<input
							id="email"
							className="inputField"
							type="email"
							placeholder="Your email"
							value={email}
							onChange={onChange}
						/>
						<input
							id="password"
							className="inputField"
							type="password"
							placeholder="Your password"
							value={password}
							onChange={onChange}
						/>
						<button className="button block" aria-live="polite">
							Send magic link
						</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default SignUp;
