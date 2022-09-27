import googleIcon from "../assets/svg/googleIcon.svg";
import { auth, store } from "../firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";

function GoogleSignIn() {
	const navigate = useNavigate();
	const location = useLocation();

	const onClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			const docRef = doc(store, "users", user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				await setDoc(doc(store, "users", user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
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
