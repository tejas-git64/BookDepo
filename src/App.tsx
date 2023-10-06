import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import Cart from "./pages/Cart/Cart";
import Nav from "./components/Nav/Nav";
import { createContext, useState } from "react";
import { Genre, ResultType, TitleSearch } from "./types/BookType";
import BookDetails from "./pages/BookDetails/BookDetails";
import Authors from "./pages/Authors/Authors";
import MobileNav from "./components/MobileNav/MobileNav";

export const AppContext = createContext<ResultType | null>(null);
function App() {
	const [searchResults, setSearchResults] = useState<TitleSearch[] | null>([]);
	const [cart, setCart] = useState<Genre[] | []>([]);

	//Options with headers for using api
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
			"X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
		},
	};

	//Function to add books to cart
	function addBookToCart(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		book_id: number,
		cover: string,
		name: string,
		url: string,
		price: number
	) {
		e.stopPropagation();
		e.preventDefault();
		setCart((prev) => [
			{
				book_id: book_id,
				cover: cover,
				name: name,
				url: url,
				price: price,
			},
			...prev,
		]);
	}

	//Function to remove books to cart
	function removeBook(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		book_id: number
	) {
		e.stopPropagation();
		e.preventDefault();
		setCart(cart.filter((book) => book.book_id !== book_id));
	}

	return (
		<>
			<AppContext.Provider
				value={{
					searchResults,
					setSearchResults,
					cart,
					setCart,
					addBookToCart,
					removeBook,
					options,
				}}>
				<Router>
					<Nav />
					<Routes>
						<Route index element={<Home />} />
						<Route path='/home' element={<Home />} />
						<Route path='/authors' element={<Authors />} />
						<Route path='/books' element={<Books />} />
						<Route path='/books/:bookid' element={<BookDetails />} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
					<MobileNav />
				</Router>
			</AppContext.Provider>
		</>
	);
}

export default App;
