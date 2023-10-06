import { Link } from "react-router-dom";
import { TitleSearch } from "../../types/BookType";
import authorBookIcon from "../../assets/images/icons8-book-60.png";

export default function Results({
	book_id,
	name,
	cover,
	authors,
	rating,
	year,
}: TitleSearch) {
	return (
		<Link
			to={`/books/${book_id}`}
			className='h-20 p-2 border-b-2 flex items-center justify-start'>
			<img
				src={cover ? cover : authorBookIcon}
				alt='book-image'
				className='w-[60px] h-full'
			/>
			<div className='w-[70%] sm:w-[75%] md:w-full h-full flex flex-col items-start justify-center text-left py-1 px-2 pr-5'>
				<b className='w-full text-[12px] text-black overflow-x-hidden overflow-y-hidden whitespace-pre-line'>
					{name}
				</b>
				<p className='w-[100%] text-[13px] text-gray-400 overflow-x-hidden whitespace-nowrap'>
					Authors: {authors.length >= 2 ? authors.slice(0, 3) : "unknown"}
				</p>
			</div>
			<div className='flex flex-col items-center justify-center'>
				<p className='text-[13px] text-black '>
					{rating ? `${rating}⭐` : "NA"}
				</p>
				<b className='text-[14px] font-medium text-neutral-400 pr-[8px]'>
					{year}
				</b>
			</div>
		</Link>
	);
}
