class DOMTool {
	createEl(obj, className, append, listener, some) {
		let el = obj;
		let style, attr, data, prepend, content, id;
		let attrValues = [
			"type",
			"method",
			"encytype",
			"hidden",
			"contenteditable",
			"disabled",
			"checked",
			"src",
			"href",
			"value",
			"min",
			"max",
			"title",
			"name",
		];

		if (typeof obj == "object") {
			el = obj.el;
			className = obj.className;
			id = obj.id;
			style = obj.style;
			attr = obj.attr;
			data = obj.data;
			append = obj.append;
			prepend = obj.prepend;
			content = obj.content;
			listener = obj.listener;
		} else if (typeof obj == "string") {
			if (some) {
				style = some.s;
				attr = some.a;
				data = some.d;
				prepend = some.p;
				content = some.c;
				id = some.i;
			}
		}

		let element = document.createElement(el);

		className && this.addClass(element, className);
		id && this.addId(element, id);
		style && this.addStyle(element, style);
		content && this.content(element, content);
		append && this.append(element, append);
		prepend && this.prepend(element, prepend);
		data && this.addData(element, data);
		attr && this.addAttr(element, attr);

		listener && this.addListener(element, listener);

		attrValues.forEach((attr) => {
			if (obj[attr]) {
				this.addAttr(element, { [attr]: obj[attr] });
			}
		});

		return element;
	}

	content(element, content) {
		if (!element || !content) return false;
		element.innerHTML = content;
	}

	append(element, append) {
		if (!element || !append) return false;
		if (typeof append == "object" && Array.isArray(append)) {
			try {
				append.forEach((toAppend) => {
					if (toAppend) element.appendChild(toAppend);
				});
			} catch (e) {}
		} else {
			try {
				element.appendChild(append);
			} catch (e) {}
		}
	}

	prepend(element, prepend) {
		if (!element || !prepend) return false;
		if (typeof prepend == "object" && Array.isArray(prepend)) {
			prepend.forEach((toprepend) => {
				if (toprepend) {
					element.prepend(toprepend);
				}
			});
		} else {
			element.prepend(prepend);
		}
	}

	addClass(element, className) {
		if (!className || !element) return false;
		if (typeof className == "string") {
			element.classList.add(className);
		} else if (typeof className == "object" && Array.isArray(className)) {
			className.forEach((cl) => {
				if (cl) element.classList.add(cl);
			});
		} else {
			return false;
		}
	}

	removeClass(element, className) {
		if (!className || !element) return false;
		if (typeof className == "string") {
			element.classList.remove(className);
		} else if (typeof className == "object" && Array.isArray(className)) {
			className.forEach((cl) => {
				element.classList.remove(cl);
			});
		} else {
			return false;
		}
	}

	addId(element, id) {
		if (!id || !element) return false;
		if (typeof id == "string") {
			element.setAttribute("id", id);
		} else {
			return false;
		}
	}

	removeId(element, id) {
		if (!id || !element) return false;
		if (typeof id == "string") {
			element.removeAttribute(id);
		} else {
			return false;
		}
	}

	addStyle(element, styles) {
		if (!element || !styles) return false;
		if (typeof styles == "object") {
			Object.entries(styles).forEach((style) => {
				element.style[style[0].split("_").join("-").toString()] = style[1];
			});
		} else {
			return false;
		}
	}

	addAttr(element, attr) {
		if (!element || !attr) return false;
		if (typeof attr == "object") {
			Object.entries(attr).forEach((pair) => {
				element.setAttribute(pair[0].split("_").join("-").toString(), pair[1]);
			});
		} else {
			return false;
		}
	}

	removeAttr(element, attr) {
		if (!element || !attr) return false;
		if (typeof attr == "object" && Array.isArray(attr)) {
			attr.forEach(element.removeAttribute);
		} else if (typeof attr == "string") {
			element.removeAttribute(attr);
		}
	}

	getAttr(element, attr) {
		if (!element || !attr) return false;
		return element.getAttribute(attr);
	}

	addData(element, data) {
		if (!element || !data) return false;
		if (typeof data == "object") {
			Object.entries(data).forEach((pair) => {
				element.setAttribute(
					`data-${pair[0].split("_").join("-").toString()}`,
					pair[1]
				);
			});
		} else {
			element.setAttribute(`data-${data}`, true);
		}
	}

	removeData(element, data) {
		if (!element || !data) return false;
		if (typeof data == "object") {
			Object.entries(data).forEach((pair) => {
				element.removeAttribute(`data-${pair[0]}`, pair[1]);
			});
		} else {
			element.removeAttribute(`data-${data}`, true);
		}
	}

	getData(element, data) {
		if (!element || !data) return false;
		return element.getAttribute(`data-${data}`);
	}

	addListener(element, listener) {
		if (!element || !listener) return false;

		const add = function (el) {
			if (typeof listener == "object") {
				Object.entries(listener).forEach((event) => {
					event[0].split("_").forEach((splited) => {
						el.addEventListener(splited, event[1]);
					});
				});
			} else {
				return false;
			}
		};

		try {
			element.forEach(add);
		} catch (e) {
			add(element);
		}
	}

	removeListener(element, listener) {
		if (!element || !listener) return false;
		if (typeof listener == "object") {
			Object.entries(listener).forEach((event) => {
				event[0].split("_").forEach((splited) => {
					if (typeof splited[1] == "function") {
						element.removeListener(splited[0], splited[1]);
					}
				});
			});
		} else {
			return false;
		}
	}

	checkForm() {
		let forms = document.querySelectorAll(".form");

		forms.forEach((form) => {
			let inputs = form.querySelectorAll("input.input-form"),
				labels = form.querySelectorAll("label");

			inputs.forEach((input) => {
				input.addEventListener("focus", function () {
					this.parentNode.classList.add("active");
				});

				input.addEventListener("blur", function () {
					if (this.value.length == 0) {
						this.parentNode.classList.remove("active");
					}
				});
			});
			labels.forEach((label) => {
				label.addEventListener("click", function () {
					inputs.forEach((input) => {
						if (input.value.length == 0) {
							input.parentNode.classList.remove("active");
						}
					});

					this.parentNode.classList.add("active");

					this.parentNode.querySelector("input").focus();
				});
			});
		});
	}

	async getSvg(svg) {
		return fetch(svg).then(async (data) => {
			const text = await data.text();
			const doc = new DOMParser().parseFromString(text, "text/html");
			return doc.querySelector("SVG");
		});
	}
}

export default DOMTool;
