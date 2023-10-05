import { useEffect, useState } from "react";
import bookData from "../../data/books.json";
import { Genre } from "../../types/BookType";
import Book from "../Book/Book";

export default function Books() {
	const [genre, setGenre] = useState("");
	const [books, setBooks] = useState<Genre[] | []>(bookData);

	const genreurl = `https://hapi-books.p.rapidapi.com/week/${genre}/10`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
			"X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
		},
	};

	//Function to get by genre on selecting
	const getBooksByGenre = async () => {
		try {
			const response = await fetch(genreurl, options);
			const result = await response.json();
			setBooks(result);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getBooksByGenre();
	}, [genre]);

	return (
		<>
			<div>
				<div className='mt-4 w-[90%] mx-auto flex items-center justify-center md:justify-between px-4'>
					<h2 className='hidden md:block font-semibold'>Books Count:</h2>
					<div className='py-2 flex items-center px-0'>
						<div className='px-2 mx-2 flex items-center justify-evenly'>
							<p className='font-semibold text-sm mr-2'>Genre</p>
							<select
								name='genre'
								id='genre'
								onChange={(e) => setGenre(e.target.value)}
								className='w-44 md:w-32 text-[14px] h-8 pb-[0.5px] border-[1px] border-neutral-300 text-neutral-900 outline-none'>
								<option value='Fantasy'>Fantasy</option>
								<option value='Poetry'>Poetry</option>
								<option value='Horror'>Horror</option>
								<option value='Mystery & Thriller'>Mystery & Thriller</option>
								<option value='Historical Fiction'>Historical Fiction</option>
								<option value='Science Fiction'>Science Fiction</option>
								<option value='Humor'>Humor</option>
								<option value='Nonfiction'>Nonfiction</option>
								<option value='Memoir & Autobiography'>
									Memoir & Autobiography
								</option>
								<option value='History & Biography'>History & Biography</option>
								<option value='Debut Novel'>Debut Novel</option>
								<option value='Young Adult Fiction'>Young Adult Fiction</option>
								<option value="Middle Grade & Children's">
									Middle Grade & Children's
								</option>
							</select>
						</div>
						<div className='hidden px-2 md:flex items-center justify-evenly'>
							<p className='font-semibold text-sm mr-2'>Author</p>
							<select
								name='author'
								id='author'
								onChange={(e) => setGenre(e.target.value)}
								className='w-36 h-8 border-[1px] bg-neutral-100 border-neutral-300 text-neutral-900 outline-none'
								disabled>
								<option value=''></option>
								<option value=''></option>
								<option value=''></option>
								<option value=''></option>
							</select>
						</div>
					</div>
				</div>
				<div className='w-[90%] mx-auto p-4'>
					<div
						style={{
							gridTemplateColumns: "repeat( auto-fill, minmax(150px, 1fr) )",
						}}
						className='w-full h-auto overflow-y-hidden rounded-3xl grid mx-auto p-1 gap-5'>
						{books.length > 1 ? (
							books.map((book) => (
								<Book
									key={book.book_id}
									book_id={book.book_id}
									name={book.name}
									cover={book.cover}
									url={book.url}
								/>
							))
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
