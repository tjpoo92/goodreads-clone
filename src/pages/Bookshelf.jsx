import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
	content: {
		width: "300px",
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		position: "relative",
	},
};

Modal.setAppElement("#root");

function Bookshelf() {
	const { loggedIn, checkingStatus } = useAuthStatus();
	const [modalIsOpen, setModalIsOpen] = useState(false);

	if (checkingStatus) {
		return <Spinner />;
	}

	// !loggedIn && toast.warning("If you're not logged in data will not be saved");
	toast.clearWaitingQueue();

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);
	const onSubmit = () => {
		closeModal();
	};

	return (
		<div>
			<div className="flex flex-col justify-center content-center h-screen">
				<h1 className="text-center mb-10 text-2xl">Your bookshelf is empty</h1>
				<button className="btn w-[30%] self-center" onClick={openModal}>
					Create shelf
				</button>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}>
				<h2 className="text-center">Create bookshelf</h2>
				<button
					className="btn bg-white absolute top-0.5 right-1"
					onClick={closeModal}>
					x
				</button>
				<form onSubmit={onSubmit} className="flex justify-center mt-3">
					<input
						type="text"
						name="shelf-name"
						id="shelf-name"
						placeholder="Enter name"
						required
					/>
					<button className="btn" type="submit">
						Create
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default Bookshelf;

// TODO: save to local storage on changed page navigation
// TODO: load local storage if not logged in
// TODO: bookshelf creation (form)
// TODO: bookshelf UI
// TODO: routing to bookshelf list
// TODO: edit bookshelf list
// TODO: delete bookshelf list (would you like to migrate to another shelf?)
