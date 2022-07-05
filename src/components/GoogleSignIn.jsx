import googleIcon from "../assets/svg/googleIcon.svg";
import { auth } from "../firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function GoogleSignIn() {
	const navigate = useNavigate();
	const location = useLocation();

	const onClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			navigate("/");
		} catch (error) {
			toast.error("Could not authorize with Google");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with </p>
			<button onClick={onClick}>
				<img className="h-12 w-12" src={googleIcon} alt="Google" />
			</button>
		</div>
	);
}

export default GoogleSignIn;
