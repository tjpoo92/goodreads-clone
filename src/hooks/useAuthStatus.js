import { useEffect, useState, useRef } from "react";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
	const _isMounted = useRef(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);

	useEffect(() => {
		if (_isMounted) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				}
				setCheckingStatus(false);
			});
		}
		return () => {
			_isMounted.current = false;
		};
	}, [_isMounted]);

	return { loggedIn, checkingStatus };
};
