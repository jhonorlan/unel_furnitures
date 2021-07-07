import { Navbar } from "./../pages/components/Navbar";
import { Footer } from "./../pages/components/Footer";
import { About, Furnitures, Home, Contact, Cart } from "../pages/Pages";
import { Route, Switch } from "react-router-dom";

import "../../assets/css/pages/style.css";

export const Pages = ({ session }) => {
	return (
		<div className="root-contents">
			<div className="root-top-contents">
				<Navbar session={session} />
			</div>

			<div className="root-body-contents">
				<Switch>
					<Route path="/about" render={() => <About />} />
					<Route
						path="/furnitures/:categories"
						render={({ match }) => (
							<Furnitures match={match} session={session} />
						)}
					/>
					<Route
						path="/furnitures"
						render={({ match }) => (
							<Furnitures match={match} session={session} />
						)}
					/>
					<Route path="/cart" render={() => <Cart session={session} />} />
					<Route path="/contact" render={() => <Contact />} />
					<Route path="/" render={() => <Home />} />
				</Switch>
			</div>

			<div className="root-bot-contents">
				<Footer />
			</div>
		</div>
	);
};

export default Pages;
