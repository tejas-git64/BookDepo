import SearchBar from "../../components/SearchBar/SearchBar";
import Results from "../../components/Results/Results";
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import Featured from "../../components/Featured/Featured";
import { FeaturedType } from "../../types/BookType";
import data from "../../data/featured.json";

export default function Home() {
	const HomeContext = useContext(AppContext);
	const [query, setQuery] = useState<string>("");
	const [featured, setFeatured] = useState<FeaturedType[] | []>(data);

	//HAPI(from Rapid API) BooksAPI url and options
	const books = `https://hapi-books.p.rapidapi.com/search/${query}`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "your-rapid-api-key",
			"X-RapidAPI-Host": "your-rapid-api-host",
		},
	};

	//Method to fetch from query
	const searchFromQuery = async () => {
		try {
			const response = await fetch(books, options);
			const result = await response.text();
			setQuery(result);
		} catch (error) {
			console.error(error);
		}
	};

	//Method to get featured books
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const getFeaturedBooks = async () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const featuredurl = `https://hapi-books.p.rapidapi.com/month/${year}/${month}`;
		try {
			const response = await fetch(featuredurl, options);
			const result = await response.json();
			setFeatured(result);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	//Use only if you have subscribed to api
	// useEffect(() => {
	// 	getFeaturedBooks();
	// }, []);

	return (
		<>
			<div className='w-full h-[60vh]'>
				<div className='shadow-inner shadow-black w-[90%] bg-[url(https://i.pinimg.com/originals/3d/7b/b1/3d7bb132a5d4ff153dad54f17b4e4be1.jpg)] md:bg-[url(https://static01.nyt.com/images/2017/05/11/t-magazine/bookstore-slide-2MCD/bookstore-slide-2MCD-superJumbo.jpg)] bg-no-repeat bg-center bg-cover h-full mx-auto my-2 rounded-3xl flex flex-col items-center justify-center'>
					<h1 className='text-white font-bold text-5xl px-10'>
						Welcome to BookDepo
					</h1>
					<p className='text-white text-xl font-bold my-3'>
						Your Personal Library of Books
					</p>
					<div
						className={`relative mt-10 w-[85%] lg:w-[900px] sm:bg-[url(https://www.reshot.com/preview-assets/illustrations/UVBH2DP357/education-books-UVBH2DP357-w1600.jpg)] bg-right bg-contain bg-no-repeat h-40 rounded-3xl flex flex-col justify-center items-center bg-amber-300 sm:bg-white mx-auto shadow-lg`}>
						<h2 className='text-2xl md:text-3xl font-bold md:mb-2 text-black'>
							Search thousands of books!
						</h2>
						<SearchBar setQuery={setQuery} searchFromQuery={searchFromQuery} />
						{HomeContext?.searchResults ? (
							HomeContext.searchResults?.length > 0 && (
								<ul className='w-[90%] sm:w-[80%] lg:w-[780px] absolute -bottom-56 md:-bottom-60 p-2 min-h-32 max-h-72 overflow-y-scroll scroll-smooth mx-auto bg-white rounded-xl shadow-md border-neutral-100 border-[1px]'>
									{HomeContext.searchResults.map((book) =>
										book ? (
											<Results
												key={book.book_id}
												name={book.name}
												book_id={book.book_id}
												authors={book.authors}
												cover={book.cover}
												url={""}
												rating={book.rating}
												created_editions={0}
												year={book.year}
											/>
										) : (
											<></>
										)
									)}
								</ul>
							)
						) : (
							<></>
						)}
					</div>
				</div>
				<div className='w-[90%] h-[45vh] mx-auto mt-12 mb-32'>
					<h2 className='w-full text-2xl font-semibold text-left'>
						Featured Books
					</h2>
					<ul className='my-4 p-2 flex overflow-x-scroll overflow-y-hidden resize-none px-0'>
						{featured.map((fbook) => (
							<Featured
								key={fbook.book_id}
								book_id={fbook.book_id}
								position={fbook.position}
								name={fbook.name}
								cover={fbook.cover}
								rating={fbook.rating}
								url={fbook.url}
							/>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
