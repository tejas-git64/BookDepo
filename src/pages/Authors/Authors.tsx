import { useContext, useEffect, useState } from "react";
import { BookAuthor } from "../../types/AuthorTypes";
import authorsData from "../../data/authors.json";
import Author from "../../components/Author/Author";
import { AppContext } from "../../App";
import AuthorDetails from "../../components/AuthorDetails/AuthorDetails";

export default function Authors() {
	const [authors, setAuthors] = useState<BookAuthor[] | []>(authorsData);
	const [isRevealed, setIsRevealed] = useState(false);
	const AuthorsContext = useContext(AppContext);
	const [authorId, setAuthorId] = useState(239579);

	//HAPI(from Rapid API) AuthorsAPI url and options
	const authorsurl = "https://hapi-books.p.rapidapi.com/top_authors";

	const getAuthors = async () => {
		try {
			const response = await fetch(authorsurl, AuthorsContext?.options);
			const readableStream = await response.text();
			const result = JSON.parse(readableStream);
			result.length > 5 && setAuthors(result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAuthors();
	}, []);

	return (
		<>
			<div
				style={{
					gridTemplateColumns: "repeat( auto-fill, minmax(160px, 1fr) )",
				}}
				className='w-[90%] xl:w-[1250px] mx-auto grid border-[1px] p-3 mt-3 gap-x-1 md:gap-x-5 gap-y-10 rounded-3xl'>
				{authors ? (
					authors.map((author) => (
						<Author
							key={author.author_id}
							author_id={author.author_id}
							name={author.name}
							image={author.image}
							url={author.url}
							popular_book_url={""}
							number_published_books={0}
							setIsRevealed={setIsRevealed}
							setAuthorId={setAuthorId}
						/>
					))
				) : (
					<div className="'w-full h-[80vh] overflow-y-hidden rounded-3xl bg-slate-100 grid place-items-center">
						<p className='text-center text-3xl font-bold'>
							There ain't no authors yet 🧔‍♂️
						</p>
					</div>
				)}
				<AuthorDetails
					authorId={authorId}
					setIsRevealed={setIsRevealed}
					isRevealed={isRevealed}
				/>
			</div>
		</>
	);
}
