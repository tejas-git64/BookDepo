//For Books entirely
export type Title = {
	book_id: number;
	name: string;
	author: string;
	votes: number;
	cover: string;
	url: string;
} | null;

//For Featured Books
export type FeaturedType = {
	book_id: string;
	position: string;
	name: string;
	cover: string;
	rating: number;
	url: string;
};

export type TitleById = {
	book_id: number;
	name: string;
	cover: string;
	url: string;
	authors: string[];
	rating: number;
	pages: number;
	published_date: string;
	synopsis: string;
};

export type TitleSearch = {
	book_id: number;
	name: string;
	cover: string;
	url: string;
	authors: [string];
	rating: number;
	created_editions: number;
	year: number;
};

export type ResultType = {
	cart: Genre[] | [];
	setCart: React.Dispatch<React.SetStateAction<[] | Genre[]>>;
	searchResults: TitleSearch[] | null;
	setSearchResults: React.Dispatch<React.SetStateAction<TitleSearch[] | null>>;
	addBookToCart: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		book_id: number,
		cover: string,
		name: string,
		url: string,
		price: number
	) => void;
	removeBook: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		book_id: number
	) => void;
	options: {
		method: string;
		headers: {
			"X-RapidAPI-Key": string;
			"X-RapidAPI-Host": string;
		};
	};
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	showLogin: boolean;
	setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
	fullname: string;
	setFullname: React.Dispatch<React.SetStateAction<string>>;
};

export type Genre = {
	book_id: number;
	name: string;
	cover: string;
	url: string;
	price: number;
};
