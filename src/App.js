import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Bookshelf from "./pages/Bookshelf";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import SearchResults from "./pages/SearchResults";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Search />} />
					<Route path="/bookshelf" element={<Bookshelf />} />
					<Route
						path="/search-results/:searchContent"
						element={<SearchResults />}
					/>
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Routes>
				<Navbar />
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
