import React, { useEffect, useState } from "react";
import { getTitle } from "./assets/js/modules/config/WebsiteConfig";
import { auth } from "./assets/js/modules/database/Firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
	Authentication,
	Developer,
	Error,
	Pages,
} from "./components/routes/Routes";
import Helmet from "react-helmet";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.css";

const Title = ({ title }) => (
	<Helmet>
		<title>{title ? title : getTitle().title}</title>
	</Helmet>
);

const App = () => {
	const [session, setSession] = useState(auth.currentUser);

	useEffect(() => {
		auth.onAuthStateChanged(setSession);
	}, []);

	return (
		<Router>
			<ReactNotification />
			<Switch>
				<Route
					path="/developers"
					render={() => {
						return (
							<React.Fragment>
								<Title />
								<Developer />
							</React.Fragment>
						);
					}}
				/>
				<Route
					path="/error"
					render={() => {
						return (
							<React.Fragment>
								<Title />
								<Error />
							</React.Fragment>
						);
					}}
				/>
				<Route
					path="/auth"
					render={() => {
						return (
							<React.Fragment>
								<Title />
								<Authentication />
							</React.Fragment>
						);
					}}
				/>
				<Route
					path="/"
					render={() => {
						return (
							<React.Fragment>
								<Title />
								<Pages session={session} />
							</React.Fragment>
						);
					}}
				/>
			</Switch>
		</Router>
	);
};

export default App;
