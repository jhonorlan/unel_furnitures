import { database } from "./Firebase";
import { formatTxtToPar, isObjEmpty } from "./../utils/Tool";
import { v4 } from "uuid";

export class Database {
	exportProducts(FURNITURES) {
		for (const categories of FURNITURES) {
			const products = categories.products;
			const catname = formatTxtToPar(categories.name);
			const date = new Date();
			const categoriesID = v4();
			const catref = database.ref(`products/${categoriesID}`);

			catref.set({
				name: categories.name,
				par: catname,
				date_added: date,
			});

			for (const product of products) {
				catref.ref(`products/${v4()}`).set({
					...product,
					categoriesID,
				});
			}
		}
	}

	getProducts() {
		return new Promise((resolve) => {
			database
				.ref("products")
				.get()
				.then((res) => resolve(res.val()));
		});
	}

	addUser(object) {
		const { credential, fn, ln, bday, sa } = object;

		return new Promise((resolve) => {
			const uuid = credential.credential.user.uid;
			database
				.ref(`users/${uuid}`)
				.set({
					firstname: fn,
					lastname: ln,
					birthday: bday.getTime(),
					shipaddress: sa,
					avatar: null,
				})
				.then(resolve);
		});
	}

	getProductInformations(products) {
		return new Promise(async (resolve) => {
			if (!products || isObjEmpty(products)) resolve(null);

			const productsInfo = [];

			try {
				for (const pair of Object.entries(products)) {
					const cartID = pair[0];
					const categoriesID = pair[1].categoriesID;

					const product = await database
						.ref(`products/${categoriesID}/products/${pair[1].productID}`)
						.get();

					productsInfo.push({
						...product.val(),
						productID: pair[1].productID,
						cartID,
					});
				}
			} catch (error) {}

			resolve(productsInfo);
		});
	}
}
