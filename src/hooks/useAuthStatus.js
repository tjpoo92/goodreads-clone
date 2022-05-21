import { useEffect, useState, useRef } from "react";
import { supabase } from "../supabaseClient";

export const useAuthStatus = () => {
	const _isMounted = useRef(true);
	const [loggedIn, setLoggedIn] = useState(null);
	const [checkingStatus, setCheckingStatus] = useState(true);

	useEffect(() => {
		if (_isMounted) {
			setLoggedIn(supabase.auth.session());

			supabase.auth.onAuthStateChange((_event, session) => {
				setLoggedIn(session);
			});
			setCheckingStatus(false);
		}
		return () => {
			_isMounted.current = false;
		};
	}, [_isMounted]);

	return { loggedIn, checkingStatus };
};
