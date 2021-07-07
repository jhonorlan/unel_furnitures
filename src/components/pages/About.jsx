import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ListContainer from "../../assets/js/jsx/ListContainer";
import Media from "./../../assets/js/modules/utils/Media";
import {
	Information,
	Options,
} from "../../assets/js/modules/config/WebsiteConfig";

const ICONS = Media.icons();

const useStyles = makeStyles({
	root: {
		maxWidth: 305,
		margin: 10,
	},
	media: {
		height: 200,
	},
});

const DeveloperCard = ({ info }) => {
	const classes = useStyles();
	const { name, position, image, facebook, twitter } = info;

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={image || Options.defaultAvatar}
					title="Developer avatar"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{position}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" href={facebook}>
					Facebook
				</Button>
				<Button size="small" color="primary" href={twitter}>
					Twitter
				</Button>
			</CardActions>
		</Card>
	);
};

export const About = () => {
	return (
		<div className="about-main-contents">
			<section className="normal-container">
				<div className="big-header">
					<h2>About UNEL FRNTR</h2>
					<Link to="/">
						<span>Some Link Description</span>
						<img src={ICONS.arrow_right} alt="" />
					</Link>
				</div>
				<div className="center-width">
					<div className="center-width-content">
						<article>
							<div className="title">
								<h1>What is {Options.websiteName}?</h1>
							</div>
							<div className="content">
								<p>{Information.about.what}</p>
							</div>
						</article>
						<article>
							<div className="title">
								<h1>Mission</h1>
							</div>
							<div className="content">
								<p>
									{typeof Information.about.mission === "object" ? (
										<ListContainer object={Information.about.mission} />
									) : (
										Information.about.mission
									)}
								</p>
							</div>
						</article>
						<article>
							<div className="title">
								<h1>Vision</h1>
							</div>
							<div className="content">
								<p>{Information.about.vision}</p>
							</div>
						</article>
					</div>
				</div>
				<div className="big-header">
					<h2>How it works</h2>
				</div>
				<div className="center-width">
					<div className="center-width-content">
						{Information.tutorials.map((obj) => (
							<ListContainer object={obj} />
						))}
					</div>
				</div>
				<div className="big-header">
					<h2>Developers</h2>
				</div>
				<div className="center-width">
					<div className="center-width-content">
						<div className="profile-cards">
							{Information.developers.map((info) => (
								<DeveloperCard info={info} />
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
