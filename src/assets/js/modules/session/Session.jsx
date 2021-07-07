import { database } from "../database/Firebase";
import { v4 } from "uuid";
import { Database } from "../database/Database";

const DATABASE = new Database();

export class Session {
	constructor(credential) {
		this.credential = credential;
	}

	getInformation() {
		return database.ref(`users/${this.credential.uid}`).get()
	}

	getCart() {
		if (!this.credential.uid) return;

		return database
			.ref(`users/${this.credential.uid}/cart`)
			.get()
			.then((data) => DATABASE.getProductInformations(data.val()));
	}

	addToCart(categoriesID, productID) {
		return new Promise((resolve) => {
			database
				.ref(`users/${this.credential.uid}/cart/${v4()}`)
				.set({
					categoriesID: categoriesID,
					productID: productID,
					date_added: new Date().getTime(),
				})
				.then(resolve);
		});
	}

	removeToCart(cartID) {
		return new Promise((resolve) => {
			database
				.ref(`users/${this.credential.uid}/cart/${cartID}`)
				.remove()
				.then(resolve);
		});
	}

	listenCart(callback) {
		if (!callback) return;

		const cart = database.ref(`users/${this.credential.uid}/cart`);

		cart.on("child_added", callback);
		cart.on("child_removed", callback);
		cart.on("child_changed", callback);
	}
}
