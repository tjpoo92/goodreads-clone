import { useState } from "react";
import Spinner from "../components/Spinner";
import { auth, store } from "../firebase.config";
import { updateEmail, updateProfile, updatePassword } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {
	const [loading, setLoading] = useState(false);
	const [updateInfo, setUpdateInfo] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
		password: "",
		password2: "",
	});
	const navigate = useNavigate();
	const { name, email, password, password2 } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onSubmit = async () => {
		const userRef = doc(store, "users", auth.currentUser.uid);

		try {
			setLoading(true);
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, { displayName: name });
				await updateDoc(userRef, { name });
			}
		} catch (error) {
			toast.error("Could not update name");
		}
		try {
			if (auth.currentUser.email !== email) {
				await updateEmail(auth.currentUser, email);
				await updateDoc(userRef, { email });
			}
		} catch (error) {
			toast.error("Could not update email");
		} finally {
			setLoading(false);
		}
		if (password !== password2) {
			toast.error("Password fields do not match");
		} else {
			try {
				await updatePassword(auth.currentUser, password);
			} catch (error) {
				toast.error("Could not update password");
			}
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="bg-gray-50 h-screen">
			<div className="relative mx-3">
				<h1 className="text-4xl absolute inset-x-0 top-0 p-2">Profile</h1>
				<button
					className="btn absolute top-0 right-0"
					type="button"
					onClick={onLogout}>
					Sign Out
				</button>
			</div>
			{loading ? (
				<Spinner />
			) : (
				<form className="grid grid-cols-2 pt-24 mx-3">
					<label htmlFor="name" className="p-2">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						disabled={!updateInfo}
						className={
							!updateInfo
								? "txt-field focus-visible:outline-none"
								: "txt-field-active focus-visible:outline-none"
						}
						value={name}
						onChange={onChange}
					/>
					<label htmlFor="email" className="p-2">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						disabled={!updateInfo}
						className={
							!updateInfo
								? "txt-field focus-visible:outline-none"
								: "txt-field-active focus-visible:outline-none"
						}
						value={email}
						onChange={onChange}
					/>
					{/* TODO: add light/dark mode, assets already imported */}

					<label htmlFor="password" className="p-2">
						Password
					</label>

					<input
						type="password"
						name="password"
						id="password"
						disabled={!updateInfo}
						className={
							!updateInfo
								? "txt-field focus-visible:outline-none"
								: "txt-field-active focus-visible:outline-none"
						}
						value={password}
						onChange={onChange}
					/>
					<label htmlFor="password2" className="p-2">
						Confirm Password
					</label>
					<input
						type="password"
						name="password2"
						id="password2"
						disabled={!updateInfo}
						className={
							!updateInfo
								? "txt-field focus-visible:outline-none"
								: "txt-field-active focus-visible:outline-none"
						}
						value={password2}
						onChange={onChange}
					/>
					<button
						type="button"
						className="btn col-span-2"
						onClick={() => {
							updateInfo && onSubmit();
							setUpdateInfo((prevState) => !prevState);
						}}>
						{updateInfo ? "Done" : "Update Profile"}
					</button>
				</form>
			)}
		</div>
	);
}

export default Profile;
