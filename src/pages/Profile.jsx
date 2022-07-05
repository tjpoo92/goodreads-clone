import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profile() {
	const [loading, setLoading] = useState(false);
	const [updateProfile, setUpdateProfile] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { name, email } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate("/");
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
						disabled={!updateProfile}
						className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
						value={name}
					/>
					<label htmlFor="email" className="p-2">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						disabled={!updateProfile}
						className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
						value={email}
					/>
					{/* TODO: add light/dark mode, assets already imported */}
					{/* TODO: allow change password in profile 
					<label htmlFor="password" className="p-2">
						Password
					</label>

					 <input
						type="password"
						name="password"
						id="password"
						disabled={!updateProfile}
						className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
					/>
					<label htmlFor="password2" className="p-2">
						Confirm Password
					</label>
					<input
						type="password"
						name="password2"
						id="password2"
						disabled={!updateProfile}
						className="border-2 border-black rounded p-1 focus-visible:outline-none m-3"
					/> */}
					<button type="button" className="btn col-span-2">
						{updateProfile ? "Done" : "Update Profile"}
					</button>
				</form>
			)}
		</div>
	);
}

export default Profile;
