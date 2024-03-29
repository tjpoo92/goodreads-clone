import { useAuthStatus } from "../hooks/useAuthStatus";
import { auth, store } from "../firebase.config";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useLocalStorage } from "../hooks/useLocalStorage";

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

let shelfArray = [];

function Bookshelf() {
	const { loggedIn, checkingStatus } = useAuthStatus();
	// eslint-disable-next-line
	const [localBookshelves, setLocalBookshelves] = useLocalStorage(
		"bookshelves",
		[]
	);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const [userInput, setUserInput] = useState({
		shelfName: "",
	});
	const { shelfName } = userInput;

	useEffect(() => {
		if (loggedIn) {
			const getData = async () => {
				const shelfRef = collection(store, "bookshelves");
				const q = query(shelfRef, where("userRef", "==", auth.currentUser.uid));
				const querySnap = await getDocs(q);
				let bookshelves = [];

				querySnap.forEach((doc) => {
					return bookshelves.push({
						id: doc.id,
						shelfName: doc.data().shelfName,
						data: doc.data(),
					});
				});
				console.log(bookshelves);
			};
			getData();
		}
	}, [loggedIn, modalIsOpen]);

	useEffect(() => {
		!loggedIn &&
			toast.warning(
				"If you're not logged data will only be saved in your browser"
			);
		toast.clearWaitingQueue();
	}, [loggedIn]);

	const writeData = async () => {
		shelfArray.push(shelfName);
		if (loggedIn) {
			await addDoc(collection(store, "bookshelves"), {
				shelfName: shelfName,
				userRef: auth.currentUser.uid,
			});
		} else {
			setLocalBookshelves(shelfArray);
		}
	};

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);
	const onSubmit = (e) => {
		e.preventDefault();
		writeData();
		closeModal();
	};

	const onChange = (e) => {
		setUserInput((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	if (checkingStatus) {
		return <Spinner />;
	} else {
		return (
			<div>
				<div className="flex flex-col justify-center content-center h-screen">
					<h1 className="text-center mb-10 text-2xl">
						Your bookshelf is empty
					</h1>
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
							id="shelfName"
							placeholder="Enter name"
							required
							value={shelfName}
							onChange={onChange}
						/>
						<button className="btn" type="submit">
							Create
						</button>
					</form>
				</Modal>
			</div>
		);
	}
}

export default Bookshelf;

// TODO: save to local storage on changed page navigation
// TODO: load local storage if not logged in
// TODO: bookshelf creation (form)
// TODO: bookshelf UI
// TODO: routing to bookshelf list
// TODO: edit bookshelf list
// TODO: delete bookshelf list (would you like to migrate to another shelf?)
