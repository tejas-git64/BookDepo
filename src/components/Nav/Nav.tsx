import { Link } from "react-router-dom";
import cart from "../../assets/images/icons8-cart-32.png";
import logo from "../../assets/images/icons8-books-48.png";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function Nav() {
	const NavContext = useContext(AppContext);

	return (
		<>
			<nav className='w-full h-20 flex items-center justify-between px-4 sm:px-10 py-2 xl:justify-around'>
				<div className='flex items-center'>
					<img src={logo} alt='bookdepo-logo' className='w-9 mr-2' />
					<h2 className='text-2xl font-bold'>BookDepo</h2>
				</div>
				<ul className='w-auto flex justify-end py-2 items-center'>
					<li className='px-4 hidden md:block'>
						<Link
							to='/home'
							className='text-black hover:text-amber-700 font-bold text-lg'>
							Home
						</Link>
					</li>
					<li className='px-4 hidden md:block'>
						<Link
							to='/books'
							className='text-black hover:text-amber-700 font-bold text-lg'>
							Books
						</Link>
					</li>
					<li className='px-4 hidden md:block'>
						<Link
							to='/authors'
							className='text-black hover:text-amber-700 font-bold text-lg'>
							Authors
						</Link>
					</li>
					<li className='px-4 hidden md:block'>
						<Link
							to='/cart'
							className='text-black relative hover:text-amber-700 font-bold text-lg'>
							<img src={cart} alt='cart' className='w-9 -mt-1' />
							<p className='w-4 text-[8px] absolute bg-black px-[2px] top-0 -right-2 -mt-2 rounded-full text-white'>
								{NavContext?.cart.length}
							</p>
						</Link>
					</li>
					<li className='px-4 pr-2 flex items-center'>
						{/* <p className='font-bold'>Hello,</p>
						<button className='mx-4 p-0'>
							<img
								src={cart}
								alt='user-profile'
								className='w-10 border-[1px] border-black rounded-full'
							/>
						</button> */}
						<button className='transition-all ease-out hover:border-none text-black hover:bg-black hover:text-white bg-transparent font-bold text-md border-[1px] p-2 px-4 border-black whitespace-nowrap ml-2'>
							Sign up/login
						</button>
					</li>
				</ul>
			</nav>
		</>
	);
}
