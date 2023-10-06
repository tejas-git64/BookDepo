import {
	AuthError,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db, googleProvider } from "../../auth/Firebase";
import googlelogo from "../../assets/images/icons8-google-48.png";
import { AppContext } from "../../App";
import { setDoc, doc, getDoc } from "firebase/firestore";

export default function Login() {
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const [signMode, setSignMode] = useState("login");
	const LoginContext = useContext(AppContext);
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	//Get Login Status
	function getLoginStatus(err: AuthError) {
		switch (true) {
			case err.code === "auth/invalid-email":
				return "Invalid email format";
				break;
			case err.code === "auth/user-disabled":
				return "User account is disabled";
				break;
			case err.code === "auth/user-not-found":
				return "User account not found";
				break;
			case err.code === "auth/wrong-password":
				return "Entered wrong password";
				break;
			default:
				return "";
				break;
		}
	}

	//Get Signup Status
	function getSignupStatus(err: AuthError) {
		switch (true) {
			case err.code === "auth/invalid-email":
				return "Invalid email format";
				break;
			case err.code === "auth/user-disabled":
				return "User account is disabled";
				break;
			case err.code === "auth/internal-error":
				return "Internal Error occured, try again later";
				break;
			case err.code === "auth/email-already-exists":
				return "User already exists";
				break;
			case err.code === "auth/wrong-password":
				return "Entered wrong password";
				break;
			default:
				return "Unknown error occurred";
				break;
		}
	}

	//Form Validation Function
	function formValidation() {
		if (email.length === 0 || pass.length === 0) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}

	//Function to login
	const logIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, pass);
			onAuthStateChanged(auth, (user) => {
				if (user) {
					LoginContext?.setLoggedIn(true);
					setTimeout(() => {
						LoginContext?.setShowLogin(false);
					}, 1000);
				}
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error(error);
			const authError = getLoginStatus(error);
			setError(authError);
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			auth.currentUser &&
				setTimeout(() => {
					LoginContext?.setShowLogin(false);
				}, 1000);
		} catch (err) {
			console.error(err);
		}
	};

	//Function to sign up/create new account
	function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (isDisabled === false) {
			(async () => {
				try {
					await createUserWithEmailAndPassword(auth, email, pass);
					onAuthStateChanged(auth, (user) => {
						(async () => {
							if (user) {
								//Initialising Users document
								await setDoc(doc(db, "users", user.uid), {
									email: email,
									fullname: LoginContext?.fullname,
									uid: user.uid,
								});
								const docRef = doc(db, "users", user.uid);
								const docSnap = await getDoc(docRef);
								if (docSnap.exists()) {
									LoginContext?.setLoggedIn(true);
									setTimeout(() => {
										LoginContext?.setShowLogin(false);
									}, 1000);
								} else {
									window.alert("Unknown error occured, try again?");
								}
							}
						})();
					});
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (err: any) {
					const authError = getSignupStatus(err);
					authError && setError(authError);
					console.error(err);
				}
			})();
		} else {
			formValidation();
		}
	}

	useEffect(() => {
		formValidation();
	}, [email.length, pass.length]);

	return (
		<>
			<dialog
				style={{
					background: "linear-gradient(0deg, #0006 ,#fffc)",
				}}
				className={`fixed top-0 left-0 ${
					LoginContext?.showLogin ? "grid" : "none"
				} h-[calc(100dvh-0dvh)] w-full place-items-center p-4`}>
				<form className='flex h-auto w-[95%] sm:w-[450px] flex-col items-start justify-center rounded-3xl bg-white p-8 px-6 shadow-xl transition-all delay-[2] ease-out md:px-10'>
					<div className='w-full mb-10 flex items-center justify-between'>
						<h2 className='w-auto whitespace-nowrap text-2xl font-bold text-black'>
							{signMode === "login"
								? "Login to your Account"
								: "Create an account"}
						</h2>
						<button
							onClick={() => LoginContext?.setShowLogin(false)}
							className='p-0 px-2 py-0.5 border-2 rounded-full'>
							&#10006;
						</button>
					</div>
					<label
						htmlFor='name'
						className={`${
							signMode !== "login" ? "block" : "hidden"
						} text-left font-semibold text-gray-600`}>
						Full name
					</label>
					<input
						type='fullname'
						name='fullname'
						onChange={(e) => LoginContext?.setFullname(e.target.value)}
						placeholder='Enter full name'
						className={`${signMode !== "login" ? "block" : "hidden"} mb-6
						 h-12 w-full rounded-lg border-none bg-neutral-100 px-3 font-semibold text-zinc-900 outline-none placeholder:text-gray-400`}
						required
					/>
					<label
						htmlFor='email'
						className='text-left font-semibold text-gray-600'>
						Email
					</label>
					<input
						type='email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter email address'
						className={` mb-6
						 h-12 w-full rounded-lg border-none bg-neutral-100 px-3 font-semibold text-zinc-900 outline-none placeholder:text-gray-400`}
						required
					/>
					<label
						htmlFor='password'
						className='text-left font-bold text-gray-600'>
						Password
					</label>
					<input
						type='password'
						name='password'
						onChange={(e) => setPass(e.target.value)}
						placeholder='Enter your password'
						className={`mb-10 h-12 w-full rounded-lg border-none bg-neutral-100 px-3 font-semibold text-zinc-900 outline-none placeholder:text-gray-400`}
						required
					/>
					{error && (
						<h4 className='mx-auto -mt-6 mb-4 w-full rounded-md p-2 font-semibold text-red-500 transition-all delay-[2s] ease-in md:w-80'>
							{error}
						</h4>
					)}
					{LoginContext?.loggedIn && (
						<h4 className='mx-auto -mt-4 mb-8 w-full rounded-md bg-green-300 p-3 font-bold text-black transition-all delay-[2s] ease-in md:w-80'>
							Logged in ✔️
						</h4>
					)}
					<button
						onClick={signMode === "login" ? logIn : signUp}
						type='submit'
						disabled={isDisabled}
						className={`${
							isDisabled
								? "cursor-not-allowed brightness-50"
								: "bg-black text-gray-200"
						} mx-auto -mt-2 h-14 w-full border-none bg-black font-bold tracking-wider text-white outline-none md:w-80`}>
						{signMode === "login" ? "Login" : "Sign up"}
					</button>
					<button
						onClick={() => setSignMode("login")}
						className={`mx-auto my-4 w-full text-zinc-500 p-0 outline-none border-none ${
							signMode === "login" ? "hidden" : "block"
						} hover:text-amber-800 bg-transparent md:w-72`}>
						Have an account? Login here
					</button>
					<button
						onClick={() => setSignMode("signup")}
						className={`mx-auto my-4 w-full text-zinc-500 p-0 outline-none border-none ${
							signMode === "login" ? "block" : "hidden"
						} hover:text-amber-800 bg-transparent md:w-72`}>
						No account? Create one here
					</button>
					<div className='mx-auto mb-6 mt-2 h-[0.5px] w-full border-t-[1px] border-zinc-300 md:w-80'>
						<p className='mx-auto -mt-[15px] h-6 w-12 bg-white text-sm'>or</p>
					</div>
					<button
						onClick={signInWithGoogle}
						type='submit'
						className='mx-auto mb-4 flex h-12 w-full items-center justify-center border-[1px] border-neutral-300 bg-white font-bold outline-none md:w-80'>
						{" "}
						<p className='mr-4 text-base font-semibold text-gray-500'>
							Sign in with Google
						</p>
						<img src={googlelogo} alt='google' className='h-7 w-7' />
					</button>
				</form>
			</dialog>
		</>
	);
}
