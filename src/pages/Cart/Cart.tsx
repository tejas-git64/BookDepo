import { useContext } from "react";
import CartBook from "../../components/CartBook/CartBook";
import { AppContext } from "../../App";

export default function Cart() {
	const CartContext = useContext(AppContext);

	return (
		<>
			<div className='w-[90%] xl:w-[1050px] h-[85vh] border-2 mx-auto my-4 p-4 rounded-2xl'>
				<h2 className='font-semibold text-md border-b-2 pb-2 px-1 text-right'>
					Items in your cart: {CartContext?.cart.length}
				</h2>
				<ul className='w-full h-[76vh] rounded-xl overflow-y-scroll'>
					{CartContext?.cart.map((book) => (
						<CartBook
							key={book.book_id}
							book_id={book.book_id}
							name={book.name}
							cover={book.cover}
							url={book.url}
						/>
					))}
				</ul>
			</div>
		</>
	);
}
