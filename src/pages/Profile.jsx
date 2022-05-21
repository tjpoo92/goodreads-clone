import { supabase } from "../supabaseClient";

function Profile() {
	return (
		<div>
			<button type="button" onClick={() => supabase.auth.signOut()}>
				Sign Out
			</button>
		</div>
	);
}

export default Profile;
