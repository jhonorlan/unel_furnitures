import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormHelperText } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";

export const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: "25ch",
	},
}));

export const InputUtil = ({ item, index, validation }) => {
	const classes = useStyles();
	switch (item.as) {
		case "input":
			return (
				<FormControl
					className={clsx(classes.margin, classes.textField)}
					variant="outlined"
					style={{ width: "100%" }}
					key={`f-${index}`}
					error={item.error ? true : false}
				>
					<InputLabel htmlFor="outlined-adornment-password">
						{item.label}
					</InputLabel>
					<OutlinedInput
						id="outlined-adornment-password"
						type={
							item.type === "password"
								? item.showPassword
									? "text"
									: "password"
								: item.type
						}
						autoFocus={item.autofocus === true}
						value={item.value}
						onChange={(event) => item.set(event.target.value)}
						endAdornment={
							item.type === "password" ? (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() =>
											item.setShowPassword &&
											item.setShowPassword(!item.showPassword)
										}
										edge="end"
									>
										{item.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							) : (
								false
							)
						}
						labelWidth={item.label.length * 8}
					/>
					<FormHelperText>{item.error && item.error}</FormHelperText>
				</FormControl>
			);

		case "multiline":
			return (
				<div className="Form-Group">
					<TextField
						id="outlined-multiline-static"
						label={item.label}
						multiline
						style={{ width: "100%" }}
						rows={4}
						variant="outlined"
						value={item.value}
						onChange={(date) => item.set(date)}
					/>
				</div>
			);

		case "link":
			return (
				<div className="Form-Group" key={`f-${index}`}>
					<div className="Link">
						<Link to={item.url}>{item.label}</Link>
					</div>
				</div>
			);
		case "plink":
			return (
				<div className="Form-Group" key={`f-${index}`}>
					<div className="PLink">{item.label}</div>
				</div>
			);
		case "button":
			return (
				<div className="Form-Group" key={`f-${index}`}>
					<Button
						variant="contained"
						color="primary"
						fullWidth={item.fullWidth}
						style={{ padding: "10px 0px" }}
						onClick={() => item.fn && item.fn()}
						disabled={validation ? !validation.value : false}
						href={item.link}
					>
						{item.label}
					</Button>
				</div>
			);
		case "checkbox":
			return (
				<div className="Form-Group" key={`f-${index}`}>
					<FormControlLabel
						control={
							<Checkbox
								checked={item.value}
								onChange={() => item.set(!item.value)}
								name="checkedB"
								color="primary"
							/>
						}
						label={item.label}
					/>
				</div>
			);
		case "date":
			return (
				<div className="Form-Group">
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label={item.label}
							style={{ width: "100%" }}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
							value={item.value}
							onChange={(date) => item.set(date)}
						/>
					</MuiPickersUtilsProvider>
				</div>
			);
		case "file":
			return (
				<Button variant="contained" component="label">
					{item.label}
					<input
						type="file"
						hidden
						value={item.value}
						onChange={(e) => item.set(e.target.files[0])}
					/>
				</Button>
			);
	}
};
