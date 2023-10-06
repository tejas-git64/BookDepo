import { Link, useNavigate } from "react-router-dom";
import cart from "../../assets/images/icons8-cart-32.png";
import logo from "../../assets/images/icons8-books-48.png";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../auth/Firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Nav() {
	const NavContext = useContext(AppContext);
	const [show, setShow] = useState(false);
	const navigate = useNavigate();

	const SignOut = async () => {
		try {
			await signOut(auth);
			onAuthStateChanged(auth, (user) => {
				if (user === null) {
					NavContext?.setLoggedIn(false);
					setShow(false);
					NavContext?.setFullname("");
					setTimeout(() => {
						navigate("/");
					}, 1000);
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			user ? NavContext?.setLoggedIn(true) : NavContext?.setLoggedIn(false);
		});
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const userRef = doc(db, "users", uid);

				(async function getSavedData() {
					//Saved data
					const userDoc = await getDoc(userRef);
					const userData = userDoc.data();
					if (userData) {
						NavContext?.setFullname(userData.fullname);
					}
				})();
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<nav className='w-full h-20 flex items-center justify-between px-4 sm:px-10 py-2 xl:justify-around'>
				<div className='flex items-center px-2'>
					<img src={logo} alt='bookdepo-logo' className='w-9 mr-2' />
					<h2 className='text-2xl font-bold'>BookDepo</h2>
				</div>
				<ul className='relative w-auto flex justify-end py-2 items-center'>
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
					<li className='mx-3 mt-1 hidden md:block relative'>
						<Link
							to='/cart'
							className='text-black hover:text-amber-700 font-bold text-lg'>
							<img src={cart} alt='cart' className='w-19 -mt-1' />
							<p className='bg-black text-white absolute px-[3px] text-xs rounded-full -top-1 -right-1'>
								{NavContext?.cart.length}
							</p>
						</Link>
					</li>
					<li className='px-4 pr-0 flex items-center'>
						<p className='text-md font-bold text-black'>
							{auth.currentUser?.displayName
								? auth?.currentUser?.displayName
								: NavContext?.fullname}
						</p>
						<button
							onClick={() => setShow(true)}
							className={`${auth.currentUser ? "block" : "hidden"} mx-4 ${
								NavContext?.fullname ? "p-2 px-4" : "p-0"
							} grid place-items-center border-[1px] border-neutral-200 rounded-full`}>
							{auth.currentUser?.photoURL ? (
								<img
									src={auth.currentUser?.photoURL}
									alt='user-profile'
									className='w-10 border-[1px] border-black rounded-full'
								/>
							) : (
								`${NavContext?.fullname.slice(0, 1)}`
							)}
						</button>
						<button
							onClick={() => NavContext?.setShowLogin(true)}
							className={`${
								auth.currentUser ? "hidden" : "block"
							} transition-all ease-out hover:border-none text-black hover:bg-black hover:text-white bg-transparent font-bold text-md border-[1px] p-2 px-4 border-black whitespace-nowrap ml-2`}>
							Sign up/login
						</button>
					</li>
				</ul>
				<div
					onMouseLeave={() => setShow(false)}
					onTouchMove={() => setShow(false)}
					className={`${
						show ? "absolute" : "hidden"
					} right-14 top-16 flex h-12 w-36 flex-col items-center justify-evenly rounded-md bg-neutral-100 border-[1px] px-1 z-10`}>
					<button
						onClick={SignOut}
						type='button'
						className='w-full flex-shrink-0 whitespace-nowrap border-none text-sm font-bold bg-red-200 text-gray-500 outline-none hover:bg-red-400 hover:text-black'>
						Logout
					</button>
				</div>
			</nav>
		</>
	);
}
