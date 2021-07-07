import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import ReadMoreReact from "read-more-react";
import Media from "./../../assets/js/modules/utils/Media";
import { Database } from "../../assets/js/modules/database/Database";
import { auth } from "../../assets/js/modules/database/Firebase";
import { Session } from "./../../assets/js/modules/session/Session";
import { InputUtil } from "../../assets/js/jsx/InputUtil";
import FURNITURES from "../../assets/js/json/furnitures.json";
import {
	formatTxtToPar,
	isInViewport,
	isObjEmpty,
	numberComma,
} from "./../../assets/js/modules/utils/Tool";

import { store } from "react-notifications-component";
import AlertDialog from "./../../assets/js/jsx/AlertDialog";
import Lightbox from "react-image-lightbox";

import "react-image-lightbox/style.css";

const DATABASE = new Database();
const ICONS = Media.icons();
const ILLUSTRATION = Media.svg.illustrations();

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

const Product = ({ product, setInfoContent, changeDialog }) => {
	const { name, price, description, sign, image } = product;
	const [loading, setLoading] = useState(true);

	return (
		<div className="furniture-product" key={name}>
			<div
				className="product-skeleton"
				style={{ display: loading ? "block" : "none" }}
			>
				<Skeleton variant="rect" width={"100%"} height={200} />
				<Skeleton variant="text" width={100} height={50} />
				<Skeleton variant="rect" height={100} />
			</div>
			<div
				className="products-content"
				style={{ display: loading ? "none" : "block" }}
			>
				<div className="buttons">
					<div
						className="button"
						onClick={() => AddtoCart(product, changeDialog)}
					>
						<div className="icon">
							<img src={ICONS.add} alt="" />
						</div>
						<div className="description">
							<span>Add to cart</span>
						</div>
					</div>
					<div className="button">
						<div className="icon">
							<img src={ICONS.favorites} alt="" />
						</div>
						<div className="description">
							<span>Add to Favorites</span>
						</div>
					</div>
				</div>
				<div className="header" onClick={() => setInfoContent(product)}>
					<img src={image} alt="" onLoad={() => setLoading(false)} />
				</div>
				<div className="body">
					<div className="price">
						<p>{`${sign}${numberComma(price)}`}</p>
					</div>
					<div className="name">
						<a href="#">{name}</a>
					</div>
					<div className="description ellipsis">
						<span>
							{
								<ReadMoreReact
									min={80}
									ideal={150}
									max={250}
									text={description}
								/>
							}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const AddtoCart = (product, changeDialog) => {
	if (!auth.currentUser) return changeDialog(product, true);
	if (!product.categoriesID || !product.productID) return;

	const insert = () => {
		const session = new Session(auth.currentUser);

		session.addToCart(product.categoriesID, product.productID).then(() => {
			store.addNotification({
				title: "Success!",
				message: `${product.name} is added to cart!`,
				type: "success",
				insert: "top",
				container: "top-right",
				animationIn: ["animate__animated", "animate__fadeIn"],
				animationOut: ["animate__animated", "animate__fadeOut"],
				dismiss: {
					duration: 5000,
					onScreen: true,
				},
			});
		});
	};

	changeDialog(product, true, insert);
};

const Info = ({ product, changeDialog }) => {
	const { name, price, sign, image } = product;
	const [loading, setLoading] = useState(true);
	const [preview, setPreview] = useState(false);
	const [index, setIndex] = useState(0);

	const images = Array.isArray(image) ? image : [image];

	const lightbox = (
		<Lightbox
			mainSrc={images[index]}
			nextSrc={images[(index + 1) % images.length]}
			prevSrc={images[(index + images.length - 1) % images.length]}
			onCloseRequest={() => setPreview(false)}
			onMovePrevRequest={() =>
				setIndex((index + images.length - 1) % images.length)
			}
			onMoveNextRequest={() => setIndex((index + 1) % images.length)}
		/>
	);

	return (
		<div className="info-contents">
			<div
				className="skeleton"
				style={{ display: !loading ? "none" : "block" }}
			>
				<Skeleton variant="rect" width={"100%"} height={200} />
				<Skeleton variant="text" width={100} height={50} />
				<Skeleton variant="rect" height={80} />
				<Skeleton variant="text" height={80} />
			</div>
			<div className="contents" style={{ display: loading ? "none" : "block" }}>
				<div className="top">
					<div className="image">
						<img
							src={image}
							alt=""
							onLoad={() => setLoading(false)}
							onClick={() => setPreview(true)}
						/>
					</div>
					<div className="price">
						<p>{`${sign}${numberComma(price)}`}</p>
					</div>
					<div className="name">
						<a href="">{name}</a>
					</div>
				</div>
				<div className="bot">
					<InputUtil
						item={{
							as: "button",
							label: "Add to cart",
							fullWidth: true,
							fn: () => AddtoCart(product, changeDialog),
						}}
						index={0}
						validation={false}
					/>
				</div>
			</div>

			{preview && lightbox}
		</div>
	);
};

export const Furnitures = ({ match, session }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [infoContent, setInfoContent] = useState(null);
	const [isVisible, setVisible] = useState();
	const [isItFooter, setIF] = useState(false);
	const [contents, setContents] = useState(null);
	const [open, setOpen] = useState(false);

	const defaultDialog = {
		title: "Add to cart",
		body: "You're not logged in!, You need to login to use your cart!",
		buttons: [
			{
				label: "Cancel",
			},
			{
				label: "Don't have an account?",
				link: "/auth/register",
			},
			{
				label: "Login",
				link: "/auth/login",
			},
		],
	};

	const [dialog, setDialog] = useState(defaultDialog);

	const changeDialog = (product, open, callback) => {
		setDialog(
			session
				? {
						title: "Add to cart",
						body: `Add ${product.name} to cart?`,
						buttons: [
							{
								label: "No",
							},
							{
								label: "Yes",
								fn: callback,
							},
						],
				  }
				: defaultDialog
		);

		setOpen(open);
	};

	const objectToArr = (object) => {
		const arr = [];

		for (const pair of Object.entries(object)) {
			arr.push({
				...pair[1],
				productID: pair[0],
			});
		}

		return arr;
	};

	const setValueAsUrl = () => {
		if (!contents) return;
		if (isObjEmpty(contents)) return;
		if (!match.params.categories) return;
		contents.forEach((f, i) => {
			if (f.name.toLowerCase() === match.params.categories.toLowerCase()) {
				setValue(i);
			}
		});
	};

	useEffect(setValueAsUrl, [contents]);

	useEffect(() => {
		const footer = document.querySelector("footer.root-footer");
		const top = document.querySelector(".furniture-background");

		const check = () => {
			const t = document.documentElement.scrollTop;
			const c = isInViewport(footer) || isInViewport(top) || t <= 280;

			setVisible(c);
			setIF(isInViewport(footer));
		};

		window.addEventListener("scroll", () => check());

		DATABASE.getProducts()
			.then((data) => setContents(objectToArr(data)))
			.catch((r) => setContents(FURNITURES));

		check();
	}, []);

	const handleClick = (groupname) => {
		window.history.pushState(
			{},
			null,
			`/furnitures/${formatTxtToPar(groupname)}`
		);
	};

	return (
		<section className={`furniture-software-container ${classes.root}`}>
			<div className="content-top-content">
				<div className="content-background">
					<img src={Media.img.backgrounds().sale_bg} alt="" />
				</div>
			</div>
			<div
				className="furniture-skeleton"
				style={{ display: !contents ? "block" : "none" }}
			>
				<div className="furniture-content">
					<div className="content-left">
						<div className="furniture-header">
							<Skeleton variant="rect" height={80} />
						</div>
						<div className="furniture-body" style={{ marginTop: 20 }}>
							<Skeleton variant="rect" height={400} />
						</div>
					</div>
					<div className="content-right">
						<Skeleton variant="rect" width={300} height={500} />
					</div>
				</div>
			</div>
			<div
				className="furniture-content"
				style={{ display: contents ? "flex" : "none" }}
			>
				<div className="content-left">
					<div className="furniture-header">
						<AppBar position="static" color="default">
							<Tabs
								value={value}
								onChange={(e, newValue) => setValue(newValue)}
								indicatorColor="primary"
								textColor="primary"
								variant="scrollable"
								scrollButtons="auto"
								aria-label="scrollable auto tabs example"
							>
								{contents &&
									contents.map(({ name }, index) => (
										<Tab
											label={name}
											{...a11yProps(index)}
											onClick={() => handleClick(name)}
											key={`tab-${index}`}
										/>
									))}
							</Tabs>
						</AppBar>
					</div>
					<div className="furniture-body">
						{contents &&
							contents.map(({ products }, index) => (
								<TabPanel value={value} index={index} key={`tabpanel-${index}`}>
									<div className="furniture-products">
										{objectToArr(products).map(
											(
												{
													name,
													price,
													description,
													image,
													productID,
													categoriesID,
												},
												index
											) => (
												<Product
													product={{
														categoriesID,
														productID,
														name,
														price,
														image,
														description,
														sign: "₱",
													}}
													setInfoContent={setInfoContent}
													changeDialog={changeDialog}
													key={`product-${index}`}
												/>
											)
										)}
									</div>
								</TabPanel>
							))}
					</div>
				</div>
				<div className="content-right">
					<div
						className={`floating-product-info ${isVisible ? "" : "fixed"} ${
							isItFooter ? "mtop" : ""
						}`}
					>
						{infoContent ? (
							<Info product={infoContent} changeDialog={changeDialog} />
						) : (
							<div>
								<div className="illustration">
									<img src={ILLUSTRATION.collecting} alt="" />
								</div>
								<div className="headline" style={{ textAlign: "center" }}>
									<h3 style={{ margin: "10px" }}>Product will preview here</h3>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{AlertDialog({
				...dialog,
				open: open,
				set: setOpen,
			})}
		</section>
	);
};

export default Furnitures;
