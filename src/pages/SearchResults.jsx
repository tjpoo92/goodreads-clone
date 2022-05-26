import { useLocation } from "react-router-dom";
import BookResult from "../components/BookResult";

function SearchResults() {
	const location = useLocation();

	const searchArray = [...location.state.data.docs];

	console.log(searchArray);
	return (
		<div>
			<ul>
				{searchArray.map((book) => {
					return <BookResult key={book.key} book={book} />;
				})}
			</ul>
		</div>
	);
}

export default SearchResults;
