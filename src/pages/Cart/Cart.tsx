import { useContext, useEffect, useState } from "react";
import CartBook from "../../components/CartBook/CartBook";
import { AppContext } from "../../App";

export default function Cart() {
	const CartContext = useContext(AppContext);
	const [totalPrice, setTotalPrice] = useState(0);

	function calculatePrice() {
		let total = 0;
		CartContext?.cart.forEach((book) => {
			total += book.price;
		});
		setTotalPrice(total);
	}

	useEffect(() => {
		calculatePrice();
	}, [CartContext?.cart]);

	return (
		<>
			<div className='w-[90%] xl:w-[1050px] h-auto border-2 mx-auto my-4 p-4 rounded-2xl'>
				<h2 className='font-semibold text-md border-b-2 pb-2 px-1 text-right'>
					Items in your cart: {CartContext?.cart.length}
				</h2>
				<ul className='w-full h-auto rounded-xl overflow-y-scroll'>
					{CartContext?.cart.map((book) => (
						<CartBook
							key={book.book_id}
							book_id={book.book_id}
							name={book.name}
							cover={book.cover}
							url={book.url}
							price={book.price || 100}
						/>
					))}
				</ul>
				<div className='w-full flex justify-between items-center px-6 my-3 py-3 border-[1px] rounded-xl'>
					<h2 className='font-bold'>Total Price</h2>
					<p className='text-xl leading-5 font-semibold text-amber-700'>
						₹{totalPrice}
					</p>
				</div>
			</div>
		</>
	);
}
