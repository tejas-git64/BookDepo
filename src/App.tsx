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

export const AppContext = createContext<ResultType | null>(null);
function App() {
	const [searchResults, setSearchResults] = useState<TitleSearch[] | null>([]);
	const [cart, setCart] = useState<Genre[] | []>([]);

	//Function to add books to cart
	function addBookToCart(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		book_id: number,
		cover: string,
		name: string,
		url: string
	) {
		e.stopPropagation();
		e.preventDefault();
		setCart((prev) => [
			{
				book_id: book_id,
				cover: cover,
				name: name,
				url: url,
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
				</Router>
			</AppContext.Provider>
		</>
	);
}

export default App;
