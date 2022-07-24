import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import Spinner from "../components/Spinner";
import GoogleSignIn from "../components/GoogleSignIn";

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
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			updateProfile(auth.currentUser, {
				displayName: name,
			});
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, "users", user.uid), formDataCopy);

			navigate("/profile");
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong with registration please try again");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col justify-center h-screen items-center bg-gray-50">
			<h1 className="text-4xl">Sign Up</h1>

			{loading ? (
				<Spinner />
			) : (
				<div className="flex flex-col justify-center items-center">
					<form
						onSubmit={onSubmit}
						className="flex flex-col items-center justify-center">
						<input
							type="text"
							className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
							id="name"
							placeholder="Your name"
							value={name}
							onChange={onChange}
						/>
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
							required
						/>
						<button className="btn">Submit</button>
					</form>
					<Link to="/forgot-password">Forgot Password?</Link>
					<Link to="/sign-in" className="my-3">
						Sign In Instead
					</Link>

					<GoogleSignIn />
				</div>
			)}
		</div>
	);
}

export default SignUp;
