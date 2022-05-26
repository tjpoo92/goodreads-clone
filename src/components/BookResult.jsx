import { useState } from "react";
import noImageFound from "../assets/gif/No-image-found.jpg";
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

function BookResult({ book }) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const id_amazon =
		book.id_amazon === undefined ? book.title : book.id_amazon[0];
	const id_overdrive =
		book.id_overdrive === undefined ? book.title : book.id_overdrive[0];
	const cover_i =
		book.cover_i === undefined
			? noImageFound
			: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

	const author_name = book.author_name === undefined ? "" : book.author_name[0];

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);
	const onSubmit = () => {
		closeModal();
	};

	if (book.isbn === undefined) {
		return;
	} else {
		return (
			<li className="border-2 border-black m-3 p-2 rounded-lg flex justify-between">
				<div className="flex ">
					{/* TODO: link to book pages */}
					<img
						src={cover_i}
						alt={`book cover: ${book.title}`}
						className="h-28 md:h-44 hidden md:block"
					/>

					<div className="pl-5 flex flex-col">
						<p className="h-6 overflow-hidden">{book.title}</p>
						<p className="h-6 overflow-hidden">{author_name}</p>

						<p className="h-6">{book.first_publish_year}</p>
					</div>
				</div>
				<div className="flex flex-col min-w-[40%]">
					<button onClick={openModal} className="btn w-fit self-center">
						Add To Bookshelf
					</button>
					<a
						href={`https://www.amazon.com/s?k=${id_amazon}`}
						target="_blank"
						rel="noreferrer"
						className="btn w-fit hidden md:block self-center">
						Buy On Amazon
					</a>
					<a
						href={`https://www.overdrive.com/search?q=${id_overdrive}`}
						target="_blank"
						rel="noreferrer"
						className="btn w-fit hidden md:block self-center">
						Borrow from Overdrive
					</a>
				</div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					style={customStyles}>
					<h2 className="text-center">Add to bookshelf</h2>
					<button
						className="btn bg-white absolute top-0.5 right-1"
						onClick={closeModal}>
						x
					</button>
					<form onSubmit={onSubmit} className="flex justify-center mt-3">
						<select name="bookshelf" id="bookshelf" className="h-10 m-3">
							<option value="bookshelf1">Bookshelf 1</option>
							<option value="bookshelf2">Bookshelf 2</option>
							<option value="bookshelf3">Bookshelf 3</option>
							<option value="bookshelf4">Bookshelf 4</option>
						</select>
						<button className="btn" type="submit">
							Add
						</button>
					</form>
				</Modal>
			</li>
		);
	}
}

export default BookResult;
