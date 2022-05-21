import googleIcon from "../assets/svg/googleIcon.svg";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";

// TODO: styling

function GoogleSignIn() {
	const location = useLocation();
	async function signInWithGoogle() {
		const { user, session, error } = await supabase.auth.signIn({
			provider: "google",
		});
	}
	return (
		<div className="socialLogin">
			<p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with </p>
			<button className="socialIconDiv" onClick={signInWithGoogle}>
				<img className="socialIconImg" src={googleIcon} alt="Google" />
			</button>
		</div>
	);
}

export default GoogleSignIn;
