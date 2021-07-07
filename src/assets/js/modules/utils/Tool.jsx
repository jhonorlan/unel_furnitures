import { matchPath } from "react-router-dom";

export const isNumeric = (str) => {
	if (typeof str != "string") return false;
	return !isNaN(str) && !isNaN(parseFloat(str));
};

export const filterName = (nameString) => {
	let name = nameString.replace("./", "");
	let current = name.substr(0, 1);

	name = name.replace(/\.(png|jpe?g|svg)$/, "");

	while (isNumeric(current)) {
		let extension = name.substr(name.lastIndexOf("."), name.length - 1);
		let other = name.substr(1, name.lastIndexOf(".") - 1);
		name = `${other}${current}${extension}`;
		current = name.substr(0, 1);
	}

	while (name.substr(0, 1) === "-") {
		let extension = name.substr(name.lastIndexOf("."), name.length - 1);
		let other = name.substr(1, name.lastIndexOf(".") - 1);
		name = `${other}${extension}`;
	}

	return name.split("-").join("_").toString();
};

export const importAll = (r, isarray) => {
	if (isarray) return r.keys().map((item) => r(item).default);

	let images = {};

	r.keys().map((item) => {
		images[filterName(item.toLowerCase())] = r(item).default;
		return r(item).default;
	});

	return images;
};

export function isMatch(path, exact = false, strict = false) {
	return matchPath(window.location.pathname, {
		path,
		exact,
		strict,
	});
}

export function formatTxtToPar(text) {
	return text.split(" ").join("-").toString().toLowerCase();
}

export function isInViewport(element, offset = 0) {
	if (!element) return false;
	const top = element.getBoundingClientRect().top;
	return top + offset >= 0 && top - offset <= window.innerHeight;
}

export function numberComma(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isObjEmpty(obj) {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
