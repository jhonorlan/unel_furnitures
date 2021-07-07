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
			label: "The solution to every Home need",
			link: {
				label: "About Us",
				link: "/about",
			},
			contents: [
				{
					position: "right",
					image: "",
					content: (
						<h3>
							<span>
								Complete your living room or den ensemble with the unique design
								of this Armless Accent Chair.
							</span>
							{" "}If You've Got The Time, We've Got The Designs.
						</h3>
					),
				},
				{
					position: "left",
					image: "",
					content: (
						<h3>
							<span>
								The upholstered headboard is generous and comfortable, and
								the frame is upholstered to continue the same softness at every
								touch point.
							</span>
							{" "}Whatever You're Into, Get Into Comfort.
						</h3>
					),
				},
			],
		},
	},
	about: {
		what: `Unique and Elegance Furniture is a lifestyle retailer dedicated to inspiring customers through a unique combination of product, 
		creativity and cultural understanding. Founded in 2019 in a small space across the street from the University of Philippines, 
		UNEL FRNTR now operates over 200 stores in the Philippines, Canada and Europe, offering experiential retail environments and 
		a well-curated mix of on-trend women’s and men’s clothes, from boho dresses, denim and graphics to shoes, hats, and backpacks, 
		as well as beauty, intimates, swim and a collection of handpicked vintage clothing. Urban Outfitters also carries 
		everything you need to decorate your small space, apartment or dorm, with a UO Home collection that includes bedding, 
		tapestries, rugs, shower curtains and furniture. Our Music + Tech collection is a go-to destination for vinyl, record players 
		and tech accessories. Visit our stores, where all are welcome and there’s always something new to see, or shop online at Unelfrntr.com 
		and get free shipping. For special offers, one-of-a-kind prizes and more, download the UO app and join UO Rewards! 
		Want to be part of the conversation? Follow, share and shop @Unelfrntr.`,
		mission: {
			index: true,
			list: [
				"Manufacture and Supply a wide range of quality furniture",
				"Consistently develop high-quality operations through",
				"To be an industry leader in sales growth and profitability performance",
				"Providing an outstanding investment for our shareholders, employees, customers, suppliers and community",
				"To promote the relationship-focused, team-oriented and honor-driven corporate culture",
			],
		},
		vision: `To be the Leading Quality Furniture Manufacturer, Supplier & Exporter`,
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
			name: "Bute, Marielle",
			position: "Web Developer",
			image:
				"https://lh3.googleusercontent.com/rbiRrriQBPeZjXRzR5nrqNgzp3ur7Or_npbtGMNh_OqFTwY5tc7ynTfYJKwXTCmA0Vzy4gk=s85",
			facebook: "https://www.facebook.com/elle.blues3",
			twitter: "https://twitter.com/Mariell87424195",
		},
		{
			name: "Millares, Noriel",
			position: "Front End Developer",
			image:
				"https://lh3.googleusercontent.com/rNtkQixdoAC9eh25n-bc2QF_tpW9y1RWKIbYZ1KQk3ysDn7PEYY0WIBQpkkNwaS0regmDA=s85",
			facebook: "https://www.facebook.com/noriel.millares.98",
			twitter:
				"https://twitter.com/norszkyy?s=09&fbclid=IwAR1yfor3w5gaZNIMeplKsLpJvjWUP7N1DJZZLvisNFwuMOZsKFK4Lqt81qU",
		},
		{
			name: "Manapsal, Jeric",
			position: "Interaction Designer",
			image:
				"https://lh3.googleusercontent.com/YkteEadO3gP2jL4gfp8y2r_roNg6uZPGe66_l74qI9IZWbRBebDre-Xg7qNuZdiRK37Huw=s85",
			facebook: "https://www.facebook.com/clastace",
			twitter:
				"https://twitter.com/clasttheace?s=07&fbclid=IwAR2nCaLt9I0PfiNu6Uzco_ajyWOSVwKwKuATndkSns2fzCKZ80q7a4SI8bE",
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
					text: "After the return is initiated you will received and automated email with complete return instructions.",
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
					text: "Once We receive your return in our warehouse, it will be process within 4 business days.",
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
