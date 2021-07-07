import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

import ReadMoreReact from "read-more-react";
import Media from "./../../assets/js/modules/utils/Media";
import { auth } from "../../assets/js/modules/database/Firebase";
import { Session } from "./../../assets/js/modules/session/Session";
import { InputUtil } from "../../assets/js/jsx/InputUtil";
import {
	isInViewport,
	numberComma,
} from "./../../assets/js/modules/utils/Tool";

import AlertDialog from "./../../assets/js/jsx/AlertDialog";
import Lightbox from "react-image-lightbox";

import "react-image-lightbox/style.css";

const ICONS = Media.icons();
const ILLUSTRATION = Media.svg.illustrations();

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

const removeToCart = (product, changeDialog) => {
	if (!product.categoriesID || !product.productID) return;

	const remove = () => {
		const session = new Session(auth.currentUser);

		session.removeToCart(product.cartID);
	};

	changeDialog(product, true, remove);
};

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
						onClick={() => removeToCart(product, changeDialog)}
					>
						<div className="icon">
							<img src={ICONS.remove} alt="" />
						</div>
						<div className="description">
							<span>Remove</span>
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
							label: "Remove to Cart",
							fullWidth: true,
							fn: () => removeToCart(product, changeDialog),
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

export const Cart = ({ session }) => {
	const classes = useStyles();
	const [infoContent, setInfoContent] = useState(null);
	const [isVisible, setVisible] = useState();
	const [isItFooter, setIF] = useState(false);
	const [contents, setContents] = useState(null);
	const [open, setOpen] = useState(false);
	const [dialog, setDialog] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const changeDialog = (product, open, callback) => {
		setDialog({
			title: "Remove to cart",
			body: `Remove ${product.name} to cart?`,
			buttons: [
				{
					label: "No",
				},
				{
					label: "Yes",
					fn: callback,
				},
			],
		});

		setOpen(open);
	};

	const updateCart = () => {
		if (session) {
			const SESSION = new Session(session);
			SESSION.getCart().then(setContents);
		}
	};

	useEffect(() => {
		if (session) {
			const SESSION = new Session(session);
			SESSION.getCart()
				.then(setContents)
				.then(() => setLoaded(true));
			SESSION.listenCart(updateCart);
		} else {
			window.location.replace("/");
		}
	}, [session]);

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

		check();
	}, []);

	return (
		<section className={`furniture-software-container ${classes.root}`}>
			<div className="content-top-content">
				<div className="content-background">
					<img src={Media.img.backgrounds().sale_bg} alt="" />
				</div>
			</div>
			<div
				className="furniture-skeleton"
				style={{ display: !contents && !loaded ? "block" : "none" }}
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
				style={{ display: contents || loaded ? "flex" : "none" }}
			>
				<div className="content-left">
					<div className="furniture-header">
						<h1>Your Cart</h1>
					</div>
					<div className="furniture-body" style={{ padding: "20px 0px" }}>
						<div
							className="headline"
							style={{
								display: !contents && loaded ? "flex" : "none",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								height: "100%",
								color: "rgba(0,0,0,0.60)",
								fontSize: "24px",
							}}
						>
							<h1>No Item in your cart!</h1>
						</div>
						<div className="furniture-products">
							{contents && contents.length
								? contents.map((item, index) => {
										return (
											<Product
												product={{
													...item,
													sign: "₱",
												}}
												setInfoContent={setInfoContent}
												changeDialog={changeDialog}
												key={`product-${index}`}
											/>
										);
								  })
								: ""}
						</div>
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

export default Cart;
