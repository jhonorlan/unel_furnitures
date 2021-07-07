import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({ title, body, buttons, open, set }) {
	return (
		<div>
			<Dialog
				open={open}
				onClose={() => set(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{title || "Dialog Title"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{body || "This is the content"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{buttons &&
						buttons.map(({ label, fn, link, autoFocus, color = "primary" }) => (
							<Button
								onClick={(e) => {
									set(false);
									fn && fn();
								}}
								color={color}
								autoFocus={autoFocus}
								href={link}
							>
								{label}
							</Button>
						))}
				</DialogActions>
			</Dialog>
		</div>
	);
}
