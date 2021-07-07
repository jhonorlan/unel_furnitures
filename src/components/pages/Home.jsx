import { useState } from "react";
import { Link } from "react-router-dom";
import { Information } from "../../assets/js/modules/config/WebsiteConfig.jsx";
import BG1 from "../../assets/media/img/backgrounds/plain-bg-1.jpg";
import Media from "./../../assets/js/modules/utils/Media";

const IMAGES = Media.img.slideshow(true);
const ICONS = Media.icons();

const Slideshow = ({ images }) => {
	const create = (img, index, className = "") => {
		return (
			<div className={`slideshow-content ${className}`} key={`slide-${index}`}>
				<img src={img} alt={`slide-${index}`} />
			</div>
		);
	};

	const [index, setIndex] = useState(0);
	const [contents, setContents] = useState(images.map((m, i) => create(m, i)));

	const display = (i, c = true) => create(images[i], i, c ? "show" : "hide");

	const getNext = (next) => {
		if (next) return index + 1 >= contents.length ? 0 : index + 1;
		else return index - 1 < 0 ? contents.length - 1 : index - 1;
	};

	const go = (next) => {
		setContents(
			contents.map((img, i) => {
				if (i === index) return display(i, false);
				else if (i === getNext(next)) return display(i, true);
				else return img;
			})
		);

		setIndex(getNext(next));
	};

	return (
		<div className="image-slideshow-container">
			<div className="image-slideshow">
				<div className="vertical-button prev" onClick={() => go(false)}></div>
				<div className="slideshow-contents">{contents}</div>
				<div className="vertical-button next" onClick={() => go(true)}></div>
			</div>
		</div>
	);
};

export const Home = () => {
	return (
		<div className="home-main-contents">
			<section className="main">
				<div className="left">
					<div className="headline">
						<h1>{Information.main.mainTagline}</h1>
						<h4>{Information.main.subTagline}</h4>
					</div>
					<div className="left-background">
						<img src={BG1} alt="" />
					</div>
				</div>
				<div className="right">
					<Slideshow images={IMAGES} />
				</div>
			</section>

			<section className="normal-container centered">
				<div className="search-engine-container">
					<div className="search-engine">
						<div className="icon">
							<img src={ICONS.search} alt="" />
						</div>
						<input type="text" placeholder="What do you want?" />
					</div>
				</div>

				<div className="cards-container">
					<div className="cards">
						{IMAGES.map((img, i) => (
							<div className="card" key={`card-${i}`}>
								<img src={img} alt="" />
								<div className="text">
									<p>Title</p>
									<span>Lorem ipsum dolor sit amet.</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="normal-container">
				<div className="big-header">
					<h2>{Information.main.intro_about.label}</h2>
					<Link to={Information.main.intro_about.link.link}>
						<span>{Information.main.intro_about.link.label}</span>
						<img src={ICONS.arrow_right} alt="" />
					</Link>
				</div>

				{Information.main.intro_about.contents &&
					Information.main.intro_about.contents.map(
						({ image, content, position }, index) => {
							return (
								<div
									className={`floating-info-container ${position || "right"}`}
								>
									<div className="info-illustration">
										<div className="ill">
											<img src={image || IMAGES[index]} alt="" />
										</div>
									</div>

									<div className="info">
										<div className="text">
											{content || (
												<h3>
													<span>
														Lorem ipsum dolor sit amet consectetur adipisicing
														elit. Dolore nostrum nemo ducimus tempora
													</span>
													recusandae facere deserunt eum blanditiis numquam
													illo.
												</h3>
											)}
										</div>
									</div>
								</div>
							);
						}
					)}
			</section>
		</div>
	);
};

export default Home;
