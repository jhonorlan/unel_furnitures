import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";

export const ListContainer = ({ object }) => {
	return (
		<React.Fragment>
			<div className="lists-container">
				<div className="title">
					<h1>{object.title}</h1>
				</div>
				{object.list &&
					object.list.map((obj, index) => {
						const { icon, text, helperText, link, external } = obj;

						return (
							<li className="list-container">
								<div className="left">
									<div className="icon">
										{!object.index ? (
											typeof icon === "object" ? (
												icon
											) : (
												<img src={icon} alt="" />
											)
										) : (
											<div className="text">
												<span>{index + 1}</span>
											</div>
										)}
									</div>
								</div>
								<div
									className="right"
									style={
										helperText
											? {}
											: {
													display: "flex",
													alignItems: "center",
											  }
									}
								>
									<div className="top">
										<p
											style={{
												textIndent: "0px",
											}}
										>
											{text || obj}
										</p>
									</div>
									{helperText && (
										<div className="bot">
											{link ? (
												external ? (
													<ExternalLink href={link}>{helperText}</ExternalLink>
												) : (
													<Link to={link}>{helperText}</Link>
												)
											) : (
												<span>{helperText}</span>
											)}
										</div>
									)}
								</div>
							</li>
						);
					})}
			</div>
		</React.Fragment>
	);
};

export default ListContainer;
