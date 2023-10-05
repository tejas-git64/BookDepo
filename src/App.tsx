import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Author from "./pages/Author/Author";
import Books from "./pages/Books/Books";
import Book from "./pages/Book/Book";
import Cart from "./pages/Cart/Cart";
import Nav from "./components/Nav/Nav";
import { createContext, useState } from "react";
import { ResultType, TitleSearch } from "./types/BookType";

export const AppContext = createContext<ResultType | null>(null);
function App() {
	const [searchResults, setSearchResults] = useState<TitleSearch[] | null>([]);
	return (
		<>
			<AppContext.Provider
				value={{
					searchResults,
					setSearchResults,
				}}>
				<Router>
					<Nav />
					<Routes>
						<Route index element={<Home />} />
						<Route path='/home' element={<Home />} />
						<Route path='/authors/:author' element={<Author />} />
						<Route path='/books' element={<Books />} />
						<Route path='/books/:book' element={<Book />} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
				</Router>
			</AppContext.Provider>
		</>
	);
}

export default App;
