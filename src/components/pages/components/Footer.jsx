import { Link } from "react-router-dom";
import { Information } from "../../../assets/js/modules/config/WebsiteConfig";
import { Options } from "./../../../assets/js/modules/config/WebsiteConfig";

export const Footer = () => {
	return (
		<footer className="root-footer">
			<div className="footer-contents">
				<div className="container">
					<div className="logo">
						<img src={Options.logo} alt="" />
					</div>
					<div className="text" style={{ color: "#fff" }}>
						<small>© UNEL FRNTR</small>
					</div>
				</div>
				<div className="container">
					<div className="head">
						<h3>Quick Links</h3>
					</div>
					<div className="links">
						<li>
							<Link to="/">
								<div className="text">
									<span>Home</span>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/">
								<div className="text">
									<span>Furnitures</span>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/">
								<div className="text">
									<span>Updates</span>
								</div>
							</Link>
						</li>
						<li>
							<Link to="/">
								<div className="text">
									<span>About</span>
								</div>
							</Link>
						</li>
					</div>
				</div>
				<div className="container">
					<div className="head">
						<h3>Contact Us</h3>
					</div>
					<div className="links">
						<li>
							<Link to={Information.contacts.facebook || "/"}>
								<div className="icon"></div>
								<div className="text">
									<span>Facebook</span>
								</div>
							</Link>
						</li>
						<li>
							<a to="/">
								<div className="text">
									<span>{Information.contacts.gmail}</span>
								</div>
							</a>
						</li>
						<li>
							<a>
								<div className="text">
									<span>{Information.contacts.phone}</span>
								</div>
							</a>
						</li>
						<li>
							<a>
								<div className="text">
									<span>{Information.contacts.address}</span>
								</div>
							</a>
						</li>
					</div>
				</div>
				<div className="container">
					<div className="map">
						<div style={{ width: "100%" }}>
							<iframe
								style={{
									width: "100%",
									height: "auto",
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
			</div>
		</footer>
	);
};

export default Footer;
