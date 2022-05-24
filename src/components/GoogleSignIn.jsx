import googleIcon from "../assets/svg/googleIcon.svg";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";

function GoogleSignIn() {
	const location = useLocation();
	async function signInWithGoogle() {
		const { user, session, error } = await supabase.auth.signIn({
			provider: "google",
		});
	}
	return (
		<div className="flex flex-col items-center justify-center">
			<p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with </p>
			<button onClick={signInWithGoogle}>
				<img className="h-12 w-12" src={googleIcon} alt="Google" />
			</button>
		</div>
	);
}

export default GoogleSignIn;
