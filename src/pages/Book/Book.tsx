import { Link } from "react-router-dom";
import { Genre } from "../../types/BookType";
import addToCart from "../../assets/images/icons8-add-to-cart-48.png";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function Book({ book_id, cover, name, url }: Genre) {
	const BookContext = useContext(AppContext);

	return (
		<>
			<Link
				to={`/books/${book_id}`}
				className='h-68 relative border-[1px] transition-all ease-out hover:shadow-2xl flex flex-col p-2 rounded-2xl flex-shrink-0'>
				<img
					src={cover}
					alt='book-cover'
					className='w-40 h-[200px] md:h-[210px] mx-auto rounded-xl'
				/>
				<button
					onClick={(e) =>
						BookContext?.addBookToCart(e, book_id, cover, name, url)
					}
					className='p-1 w-auto absolute top-4 right-[13%] md:top-4 outline-none'>
					<img src={addToCart} alt='add to cat' className='w-6' />
				</button>
				<h2 className='text-black py-1 text-left px-1 line-clamp-2 font-semibold text-sm'>
					{name}
				</h2>
			</Link>
		</>
	);
}
