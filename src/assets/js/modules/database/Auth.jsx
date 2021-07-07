import { auth } from "./Firebase";

export class Auth {
	Login(email, password) {
		let obj = { emailError: "", passwordError: "" };
		return new Promise((resolve, reject) => {
			auth
				.signInWithEmailAndPassword(email, password)
				.then((stat) => resolve(stat))
				.catch((err) => {
					switch (err.code) {
						case "auth/invalid-email":
						case "auth/user-disabled":
						case "auth/user-not-found":
							obj.emailError = err.message;
							break;
						case "auth/wrong-password":
							obj.passwordError = err.message;
							break;
						default:
					}

					reject(obj);
				});
		});
	}

	Register(email, password) {
		let obj = { emailError: "", passwordError: "" };
		return new Promise((resolve, reject) => {
			auth
				.createUserWithEmailAndPassword(email, password)
				.then(resolve)
				.catch((err) => {
					switch (err.code) {
						case "auth/email-already-in-use":
						case "auth/invalid-email":
							obj.emailError = err.message;
							break;
						case "auth/weak-password":
							obj.passwordError = err.message;
							break;
						default:
					}

					reject(obj);
				});
		});
	}

	Logout = () => auth.signOut();

	StateChange() {
		return new Promise((resolve) =>
			auth.onAuthStateChanged((u) => resolve(u ?? null))
		);
	}
}

export default Auth;
