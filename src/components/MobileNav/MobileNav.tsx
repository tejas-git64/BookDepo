import { Link } from "react-router-dom";
import homeIcon from "../../assets/images/icons8-home-48.png";
import booksIcon from "../../assets/images/icons8-books-menu-48.png";
import authorIcon from "../../assets/images/icons8-author-48.png";
import cartIcon from "../../assets/images/icons8-cart-32.png";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function MobileNav() {
	const MobileContext = useContext(AppContext);

	return (
		<>
			<nav className='w-full fixed sm:hidden bottom-0 border-neutral-200 border-t-[1px] bg-white flex items-center justify-around p-4'>
				<Link to='/home'>
					<img src={homeIcon} alt='home' className='w-7 h-7' />
				</Link>
				<Link to='/books'>
					<img src={booksIcon} alt='books' className='w-7 h-7' />
				</Link>
				<Link to='/authors'>
					<img src={authorIcon} alt='authors' className='w-7 h-7' />
				</Link>
				<Link to='/cart' className='relative'>
					<p className='bg-black text-white absolute rounded-full px-1 text-[10px] -right-2'>
						{MobileContext?.cart.length}
					</p>
					<img src={cartIcon} alt='cart' className='w-8 h-8' />
				</Link>
			</nav>
		</>
	);
}
