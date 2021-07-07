import { ExternalLink } from "react-external-link";
import { Link } from "react-router-dom";
import { Information } from "../../assets/js/modules/config/WebsiteConfig";
import ListContainer from "../../assets/js/jsx/ListContainer";
import Media from "./../../assets/js/modules/utils/Media";

const SOCIALMEDIA = Media.svg.socialMedia();
const ICONS = Media.icons();
const { facebook, twitter, gmail, phone, address } = Information.contacts;

export const Contact = () => {
	const contacts = {
		title: "Contacts",
		list: [
			{
				icon: SOCIALMEDIA.facebook,
				text: "Facebook",
				helperText: "Visit us on Facebook",
				link: facebook,
				external: true,
			},
			{
				icon: SOCIALMEDIA.twitter,
				text: "Twitter",
				helperText: "Visit us on Twitter",
				link: twitter,
				external: true,
			},
			{
				icon: SOCIALMEDIA.gmail,
				text: "Gmail",
				helperText: gmail,
			},
			{
				icon: ICONS.phone,
				text: "Phone",
				helperText: phone,
			},
			{
				icon: ICONS.location,
				text: "Address",
				helperText: address,
			},
		],
	};
	return (
		<div className="contact-main-contents">
			<section className="normal-container">
				<div className="big-header">
					<h2>Chat with Us</h2>
					<Link>
						<span>Some Link Description</span>
						<img src={ICONS.arrow_right} alt="" />
					</Link>
				</div>
				<div className="center-width">
					<div className="center-width-content">
						{<ListContainer object={contacts} />}
					</div>
				</div>
			</section>
			<section className="normal-container">
				<div className="big-header">
					<h2>Find Us</h2>

					<ExternalLink href={Information.contacts.googlemapLink}>
						<span>View larger map</span>
						<img src={ICONS.arrow_right} alt="" />
					</ExternalLink>
				</div>
				<div className="center-width">
					<div className="center-width-content">
						<div style={{ width: "100%", height: "auto" }}>
							<iframe
								style={{
									width: "100%",
									height: "400px",
									frameBorder: 0,
									scrolling: "no",
									marginHeight: 0,
									marginWidth: 0,
								}}
								src={Information.contacts.googlemap}
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Contact;
