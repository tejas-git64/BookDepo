import { useContext } from "react";
import { Genre } from "../../types/BookType";
import { AppContext } from "../../App";
import trash from "../../assets/images/icons8-trash-24.png";

export default function CartBook({ book_id, cover, name }: Genre) {
	const CartBookContext = useContext(AppContext);

	return (
		<>
			<div className='border-b-2 w-full h-28 flex items-center justify-between px-6 py-[7px]'>
				<img src={cover} alt='book-cover' className='w-16 h-20 flex-shrink-0' />
				<h2 className='w-full h-full text-sm md:text-[15px] text-left px-4 py-1 text-black font-semibold line-clamp-3'>
					{name}
				</h2>
				<button
					onClick={(e) => CartBookContext?.removeBook(e, book_id)}
					className='-mb-14 w-10 p-2 bg-transparent border-2 border-none outline-none hover:bg-red-100'>
					<img src={trash} alt='remove-book' />
				</button>
			</div>
		</>
	);
}
