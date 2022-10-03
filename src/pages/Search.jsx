import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as SearchIcon } from "../assets/svg/magnifyingGlass.svg";

function Search() {
	const [searchContent, setSearchContent] = useState("");

	const navigate = useNavigate();

	const onChange = (e) => {
		setSearchContent(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://openlibrary.org/search.json?q=${searchContent}`
			);
			const data = await response.json();
			//Some function to send data to and navigate to search results
			console.log(data);
			navigate(`/search-results/${searchContent.replace(/\s/g, "+")}`, {
				state: { data: data },
			});
		} catch (error) {
			toast.error("Search returned no results, please try again");
		}
	};

	return (
		<div className="flex flex-col h-screen bg-gray-50">
			<h1 className="text-4xl font-bold self-center m-10">Book'n</h1>
			<div className="flex justify-center items-center self-center h-[66%]">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="searchContent"
						value={searchContent}
						onChange={onChange}
						placeholder="Search..."
						id="searchContent"
						className="rounded-full border-2 border-neutral-400 focus:border-black focus-visible:outline-none p-3"
					/>
					<button type="submit" className="pl-5">
						<SearchIcon height="20px" width="20px" />
					</button>
				</form>
			</div>
		</div>
	);
}

export default Search;
