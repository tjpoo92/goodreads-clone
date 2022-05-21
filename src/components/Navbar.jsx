import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/svg/magnifyingGlass.svg";
import { ReactComponent as BookshelfIcon } from "../assets/svg/bookBookmarkIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/svg/personOutlineIcon.svg";

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
	};

	return (
		<footer className="w-full bg-gray-200 fixed inset-x-0 bottom-0 border-t-2 border-neutral-400">
			<ul className="flex items-center justify-around p-2">
				<li onClick={() => navigate("/")}>
					<SearchIcon fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"} />
				</li>
				<li onClick={() => navigate("/bookshelf")}>
					<BookshelfIcon
						fill={pathMatchRoute("/bookshelf") ? "#2c2c2c" : "#8f8f8f"}
					/>
				</li>
				<li onClick={() => navigate("profile")}>
					<ProfileIcon
						fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
					/>
				</li>
			</ul>
		</footer>
	);
}

export default Navbar;
