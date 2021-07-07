import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
	formatTxtToPar,
	isMatch,
} from "./../../../assets/js/modules/utils/Tool";
import { auth } from "../../../assets/js/modules/database/Firebase";
import { InputUtil } from "../../../assets/js/jsx/InputUtil";
import { Database } from "./../../../assets/js/modules/database/Database";
import { Options } from "./../../../assets/js/modules/config/WebsiteConfig";
import ButtonPopper from "../../../assets/js/jsx/ButtonPopper";
import LOCALFURNITURES from "../../../assets/js/json/furnitures.json";
import Search from "../../../assets/media/svg/ui-icons/search.svg";
import Cart from "../../../assets/media/svg/ui-icons/cart.svg";
import Account from "../../../assets/media/svg/ui-icons/person.svg";

const DATABASE = new Database();

const createLinks = (all) => {
	const links = all.map(({ text, url, sub }, index) => {
		const float = !sub ? (
			""
		) : (
			<div className="float-container">
				<div className="con-bot">
					{sub.map(({ text, url }, i) => (
						<NavLink
							to={url}
							className={`con-link`}
							key={`sub-${i}`}
							activeClassName={"active"}
						>
							{text}
						</NavLink>
					))}
				</div>
			</div>
		);

		return (
			<li className="nav-link" key={`link-${index}`}>
				<NavLink
					to={url}
					activeClassName="active"
					exact={url === "/"}
					className="main-link"
				>
					{text}
				</NavLink>
				{float}
			</li>
		);
	});

	return <div className="links">{links}</div>;
};

export const Navbar = ({ session }) => {
	const [furnitures, setFurnitures] = useState(LOCALFURNITURES);

	const contents = [
		{
			text: "Home",
			url: "/",
			exact: true,
		},
		{
			text: "Furnitures",
			url: "/furnitures",
			sub:
				furnitures &&
				furnitures.map((cat) => {
					return {
						text: cat.name,
						url: `/furnitures/${formatTxtToPar(cat.name)}`,
					};
				}),
		},
		{
			text: "About",
			url: "/about",
		},
		{
			text: "Contact",
			url: "/contact",
		},
	];

	const objtoarr = (object) => {
		const arr = [];

		for (const pair of Object.entries(object)) {
			arr.push({
				...pair[1],
				uid: pair[0],
			});
		}

		return arr;
	};

	useEffect(() => {
		DATABASE.getProducts().then((obj) => obj && setFurnitures(objtoarr(obj)));
	}, []);

	return (
		<div className="root-nav">
			<div className="nav-contents">
				<div className="nav-left">
					<div className="nav-logo">
						<img src={Options.logo} alt="" />
					</div>
				</div>
				<div className="nav-right">
					<div className="nav-links">
						{createLinks(contents)}
						<div className="buttons">
							<ButtonPopper
								info={{
									label: (
										<img src={Search} alt="Search icon" style={{ width: 26 }} />
									),
									link: "/search",
									active: isMatch("/search"),
								}}
							/>
							<ButtonPopper
								info={{
									label: (
										<img src={Cart} alt="Search icon" style={{ width: 26 }} />
									),
									content: [
										{
											label: "Your Cart",
											link: session ? "/cart" : false,
										},
									],
									active: isMatch("/cart"),
								}}
							/>

							{session ? (
								<ButtonPopper
									info={{
										label: (
											<img
												src={Account}
												alt="Profile icon"
												style={{ width: 26 }}
											/>
										),
										content: [
											{
												label: "Profile",
												link: "/profile",
											},
											{
												label: "Settings",
												link: "/settings",
											},
											{
												label: "Logout",
												fn: () => auth.signOut(),
											},
										],
										active: isMatch("/search"),
									}}
								/>
							) : (
								<div style={{ width: "120px", padding: "10px" }}>
									<InputUtil
										item={{
											as: "button",
											label: "Login",
											fullWidth: true,
											link: "/auth/login",
										}}
										index={0}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
