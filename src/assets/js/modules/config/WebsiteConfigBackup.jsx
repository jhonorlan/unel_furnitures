import { isMatch } from "../utils/Tool";
import defaultAvatar from "../../../media/img/default_avatar.png";
import logo from "../../../media/img/logo.png";
import Media from "./../utils/Media";

const ICONS = Media.icons();

export const Options = {
	shortName: "UNEL FRNTR",
	websiteName: "Unel Furnitures",
	logo: logo,
	defaultAvatar: defaultAvatar,
};

// CONFIGS
export const Titles = [
	{
		url: "/",
		title: Options.websiteName,
	},
	{
		url: "/furnitures",
		title: "Furnitures",
	},
	{
		url: "/about",
		title: `About ${Options.websiteName}`,
	},
	{
		url: "/contact",
		title: "Contact Us",
	},
	{
		url: "/cart",
		title: "Your Cart",
	},
	{
		url: "/profile",
		title: "Your Profile",
	},
	{
		url: "/auth/auth",
		title: "Authentication",
	},
	{
		url: "/auth/login",
		title: "Login || Unel Furniture",
	},
	{
		url: "/auth/register",
		title: "Register || Unel Furniture",
	},
];

export const Information = {
	main: {
		mainTagline: "Fill your home with uniqueness",
		subTagline: "Huge variety with modern glamour!",
		intro_about: {
			label: "Big Header Description",
			link: {
				label: "Some Link Description",
				link: "/",
			},
			contents: [
				{
					position: "right",
					image: "",
					content: (
						<h3>
							<span>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
								maxime accusantium mollitia velit, veniam, consequuntur nulla
								nesciunt repudiandae provident laudantium eveniet
							</span>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
							atque.
						</h3>
					),
				},
				{
					position: "left",
					image: "",
					content: (
						<h3>
							<span>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
								maxime accusantium mollitia velit, veniam, consequuntur nulla
								nesciunt repudiandae provident laudantium eveniet
							</span>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
							atque.
						</h3>
					),
				},
			],
		},
	},
	about: {
		what: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Omnis, provident, odio aperiam eligendi sint optio totam minus
				dignissimos animi necessitatibus tempora amet assumenda.
				Debitis deleniti enim suscipit architecto quam reprehenderit
				sapiente rerum dolore eveniet excepturi veritatis nulla quia
				laudantium odit, sequi consectetur nisi libero distinctio
				consequuntur at quas nihil explicabo minima itaque.
				Perferendis, quae corporis harum placeat optio, non sunt nihil
				dolores qui, temporibus reprehenderit commodi nostrum
				expedita! Iste aspernatur voluptatum nihil illum impedit! Quam
				qui dolorem ex vitae dignissimos consequuntur eligendi sint
				rerum aut quae ducimus, nostrum iure excepturi harum quod
				ipsam alias. Magnam, impedit. Reiciendis atque cumque quod?`,
		mission: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Explicabo error optio velit dolorum. Rem, voluptates!`,
		vision: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Explicabo error optio velit dolorum. Rem, voluptates!`,
	},
	contacts: {
		facebook: "https://www.facebook.com/",
		twitter: "https://twitter.com/",
		gmail: "unelfrntr@gmail.com",
		phone: "+631234567890",
		address: "22 Jhocson Street Sampaloc Manila, Philippines",
		googlemap:
			"https://maps.google.com/maps?hl=en&q=22%20jhocson%20Street%20sampaloc%20manila,%20Philippines+(UNEL%20FRNTR)&t=&z=14&ie=UTF8&iwloc=B&output=embed",
		googlemapLink: "https://goo.gl/maps/WjFGCEHGvyDskCQRA",
	},
	developers: [
		{
			name: "Lastname, Firstname",
			position: "Web Developer",
			image: "",
			facebook: "/",
			twitter: "/",
		},
		{
			name: "Lastname, Firstname",
			position: "Front End Developer",
			image: "",
			facebook: "/",
			twitter: "/",
		},
		{
			name: "Lastname, Firstname",
			position: "UI Designer",
			image: "",
			facebook: "/",
			twitter: "/",
		},
		{
			name: "Lastname, Firstname",
			position: "UX Designer",
			image: "",
			facebook: "/",
			twitter: "/",
		},
		{
			name: "Lastname, Firstname",
			position: "Interaction Designer",
			image: "",
			facebook: "/",
			twitter: "/",
		},
		{
			name: "Lastname, Firstname",
			position: "Content Strategist",
			image: "",
			facebook: "/",
			twitter: "/",
		},
	],
	tutorials: [
		{
			title: "Return Policy",
			list: [
				{
					icon: ICONS.phone_mobile,
					text: "To open a return contact UnelFurniture at +639073037584. We will open a return and provide you with an RMA number.",
					helperText:
						"Please note that no return will be accepted without approval of return",
				},
				{
					icon: ICONS.chat,
					text: "After the return is initiated you will recieved and automated email with complete return instructions.",
					helperText:
						"Your RMA number and return address is include with this email",
				},
				{
					icon: ICONS.ship_truck,
					text: "Ship your return to us via the carrier of your choice",
					helperText:
						"To ensure faster processing of your return, please write the RMA number on the outside of your package you are returning the items in.",
				},
				{
					icon: ICONS.checkmark,
					text: "Once We recieve your return in our warehouse, it will be process within 4 business days.",
					helperText:
						"The request may took 10 business days after accepting the return for refunds to appear on your bank statements.",
				},
			],
		},
		{
			title: "Shopping",
			list: [
				{
					icon: ICONS.search,
					text: "Find furniture that you're interested at.",
					helperText: "Make sure to not duplicated your items",
				},
				{
					icon: ICONS.cart,
					text: "Place your furniture at your cart",
					helperText: "Duplicate items will results inconvenient experience",
				},
				{
					icon: ICONS.document_edit,
					text: "Setup Billing information",
					helperText: "Make sure that address and contact information are true",
				},
				{
					icon: ICONS.money,
					text: "Buy the furniture",
					helperText: "Wait for the receipt on the email you provide",
				},
				{
					icon: ICONS.ship_truck,
					text: "Wait for delivery",
					helperText: "Your item will be delivered at your area",
				},
			],
		},
	],
};

// FUNCTIONS
export function getTitle() {
	return (
		Titles.filter(({ url }) => isMatch(url, url === "/"))[0] || "Unel Furniture"
	);
}

export const Config = { Titles, Information, functions: { getTitle } };

export default Config;
