// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TitleById } from "../../types/BookType";
import cartIcon from "../../assets/images/icons8-add-to-cart-48.png";
import { AppContext } from "../../App";

export default function BookDetails() {
	//temporary data incase rapid api request is rate limited
	const data = {
		book_id: 56597885,
		name: "Beautiful World, Where Are You",
		cover:
			"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618329605l/56597885.jpg",
		url: "https://www.goodreads.com/book/show/56597885",
		authors: ["Sally Rooney"],
		rating: 3,
		pages: 356,
		published_date: "September 7th 2021",
		synopsis:
			"Beautiful World, Where Are You is a new novel by Sally Rooney, the bestselling author of Normal People and Conversations with Friends.Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known sinceBeautiful World, Where Are You is a new novel by Sally Rooney, the bestselling author of Normal People and Conversations with Friends.Alice, a novelist, meets Felix, who works in a warehouse, and asks him if he’d like to travel to Rome with her. In Dublin, her best friend, Eileen, is getting over a break-up and slips back into flirting with Simon, a man she has known since childhood. Alice, Felix, Eileen, and Simon are still young—but life is catching up with them. They desire each other, they delude each other, they get together, they break apart. They have sex, they worry about sex, they worry about their friendships and the world they live in. Are they standing in the last lighted room before the darkness, bearing witness to something? Will they find a way to believe in a beautiful world?",
	};
	const { bookid } = useParams();
	const [bookDetails, setBookDetails] = useState<TitleById | null>(data);
	const DetailContext = useContext(AppContext);

	const bookurl = `https://hapi-books.p.rapidapi.com/book/${String(bookid)}`;

	//Getting BookDetails from bookid
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async function getBookDetails() {
		try {
			const response = await fetch(bookurl, DetailContext?.options);
			const result = await response.json();
			setBookDetails(result);
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	}

	// useEffect(() => {
	// 	getBookDetails();
	// }, [bookid]);

	return (
		<>
			<div className='w-[90%] xl:w-[1300px] h-auto my-[5vh] flex flex-col lg:flex-row items-center justify-center md:justify-evenly mx-auto px-2 py-10 rounded-2xl border-2'>
				<img
					src={bookDetails?.cover}
					alt='bookcover'
					className='w-[270px] mx-auto md:mx-0 md:w-72 xl:w-80 h-96 md:h-[400px] lg:h-auto'
				/>
				<div className='w-full lg:w-[600px] flex flex-col p-4 items-start justify-center'>
					<h2 className='text-xl font-medium uppercase mx-auto lg:mx-0 mt-2 my-8 text-neutral-700'>
						{bookDetails?.name}
					</h2>
					<div className='w-full flex justify-start items-center'>
						<p className='mr-2'>
							{bookDetails && bookDetails.authors.length >= 1
								? "Authors: "
								: "Author: "}
						</p>
						<b>{bookDetails?.authors}</b>
					</div>
					<p className='text-md font-semibold my-2'>
						Rating: {bookDetails?.rating}⭐
					</p>
					<p className='text-gray-400 text-sm font-medium'>
						No of Pages: {bookDetails?.pages}
					</p>
					<b className='text-left mt-2'>Synopsis:</b>
					<q className='text-justify my-1 text-sm'>{bookDetails?.synopsis}</q>
					<button
						onClick={(e) =>
							DetailContext?.addBookToCart(
								e,
								bookDetails?.book_id || 0,
								bookDetails?.cover || "",
								bookDetails?.name || "",
								bookDetails?.url || "",
								100
							)
						}
						className='mx-auto lg:mx-0 my-6 flex bg-black border-[1px] border-black'>
						<p className='pr-2 font-semibold text-white'>Add to cart</p>
						<img src={cartIcon} alt='add to cart' className='w-6 invert' />
					</button>
				</div>
			</div>
		</>
	);
}
