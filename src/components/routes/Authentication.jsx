import React, { useState, createRef, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Auth } from "../../assets/js/modules/database/Auth";
import { InputUtil, useStyles } from "../../assets/js/jsx/InputUtil";
import { Database } from "../../assets/js/modules/database/Database";
import Media from "../../assets/js/modules/utils/Media";
import LOGIN from "../../assets/media/img/backgrounds/login-form.jpg";
import REGISTER from "../../assets/media/img/backgrounds/register-form.jpg";
import "./../../assets/css/authentication/authentication.css";

const AUTHENTICATION = new Auth();
const DATABASE = new Database();

const Form = ({ contents, validation }) => {
	const classes = useStyles();
	const form = createRef();

	useEffect(() => {
		const inputs = form.current.querySelectorAll("input");
		const textarea = form.current.querySelectorAll("textarea");
		const len = inputs.length + textarea.length;
		const val = [];

		[inputs, textarea].forEach((group) =>
			group.forEach((input) => {
				if (input.value.length || input.checked) {
					val.push(input);
				}
			})
		);

		if (val.length === len) validation.set(true);
		else validation.set(false);
	}, [form]);

	useEffect(() => {
		const inputs = form.current.querySelectorAll("input");

		if (inputs.length) {
			inputs[0].setAttribute("autofocus", true);
		}
	}, []);

	return (
		<div className={`Form ${classes.root}`} ref={form}>
			{contents.map((a, i) => (
				<InputUtil item={a} index={i} validation={validation} />
			))}
		</div>
	);
};

const Login = ({ data }) => {
	const { setter, getter } = data;
	const [validate, setValidate] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="authentication-container">
			<div className="left">
				<div className="background-image">
					<img src={LOGIN} alt="" />
				</div>
			</div>
			<div className="right">
				<div className="top">
					<div className="logo">
						<img src={Media.logo} alt="" />
					</div>
					<div className="title">
						<h1>Welcome</h1>
					</div>
				</div>
				<div className="bot">
					<Form
						validation={{ value: validate, set: setValidate }}
						contents={[
							{
								as: "input",
								type: "email",
								label: "Email Address",
								autofocus: true,
								value: getter.email,
								set: setter.setEmail,
								error: getter.emailErr,
							},
							{
								as: "input",
								type: "password",
								label: "Password",
								toggle: { type: ["password", "text"] },
								value: getter.password,
								set: setter.setPassword,
								error: getter.passErr,
								showPassword,
								setShowPassword
							},
							{
								as: "link",
								label: "Forgot Password?",
								url: "/auth/forgot-password",
							},
							{
								as: "button",
								label: "Login",
								fn: data.actions.login,
								fullWidth: true,
							},
							{
								as: "plink",
								label: (
									<p>
										Don't have an account? <a href="/auth/register">Register</a>
									</p>
								),
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};

const Register = ({ data }) => {
	const { setter, getter } = data;
	const [checked, setChecked] = useState(false);
	const [validate, setValidate] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const ELEMENT = (
		<React.Fragment>
			<div className="left">
				<div className="background-image">
					<img src={REGISTER} alt="" />
				</div>
			</div>
			<div className="right">
				<div className="top">
					<div className="logo">
						<img src={Media.logo} alt="" />
					</div>
					<div className="title">
						<h1>Create your account</h1>
					</div>
				</div>
				<div className="bot">
					<Form
						validation={{ value: validate, set: setValidate }}
						contents={[
							{
								as: "input",
								type: "email",
								label: "Email Address",
								value: getter.email,
								set: setter.setEmail,
								autofocus: true,
								error: getter.emailErr,
							},
							{
								as: "input",
								type: "password",
								label: "Password",
								toggle: { type: ["password", "text"] },
								value: getter.password,
								set: setter.setPassword,
								setShowPassword: setShowPassword,
								showPassword: showPassword,
								error: getter.passErr,
							},
							{
								as: "checkbox",
								label: (
									<span style={{ fontSize: "12px" }}>
										I agree to the Google{" "}
										<a
											href="/"
											style={{ color: "#3888EC", textDecoration: "none" }}
										>
											Terms of Service{" "}
										</a>
										and
										<a
											href="/"
											style={{ color: "#3888EC", textDecoration: "none" }}
										>
											Privacy Policy{" "}
										</a>
									</span>
								),
								value: checked,
								set: setChecked,
							},
							{
								as: "button",
								label: "Continue",
								fn: data.actions.register,
								fullWidth: true,
							},
							{
								as: "plink",
								label: (
									<p>
										Already have an account? <a href="/auth/login">Login</a>
									</p>
								),
							},
						]}
					/>
				</div>
			</div>
		</React.Fragment>
	);

	return (
		<div className="authentication-container">
			{getter.status !== 202 ? ELEMENT : <Continue data={getter} />}
		</div>
	);
};

const Continue = ({ data }) => {
	const { credential, email, password } = data;
	const [validate, setValidate] = useState(false);
	const [fn, setFn] = useState("");
	const [ln, setLn] = useState("");
	const [sa, setSa] = useState("");
	const [bday, setBday] = useState(null);

	const finish = () => {
		DATABASE.addUser({
			credential: { credential, email, password },
			fn,
			ln,
			sa,
			bday,
		}).then(() => window.location.replace("/furnitures"));
	};

	return (
		<div className="authentication-container">
			<div className="left">
				<div className="background-image">
					<img src={REGISTER} alt="" />
				</div>
			</div>
			<div className="right">
				<div className="top">
					<div className="logo">
						<img src={Media.logo} alt="" />
					</div>
					<div className="title">
						<h1>Setup your account!</h1>
					</div>
				</div>
				<div className="bot">
					<Form
						validation={{ value: validate, set: setValidate }}
						contents={[
							{
								as: "input",
								type: "text",
								label: "Firstname",
								value: fn,
								set: setFn,
							},
							{
								as: "input",
								type: "text",
								label: "Lastname",
								value: ln,
								set: setLn,
							},
							{
								as: "input",
								label: "Shipping Address",

								type: "text",
								value: sa,
								set: setSa,
							},
							{
								as: "date",
								label: "Birthdate",
								value: bday,
								set: setBday,
							},

							{
								as: "button",
								label: "Finish",
								fn: finish,
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
};

export const Authentication = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailErr, setEmailErr] = useState("");
	const [passErr, setPassErr] = useState("");
	const [status, setStatus] = useState(205);
	const [credential, setCredential] = useState(null);

	const login = () => {
		AUTHENTICATION.Login(email, password)
			.then((a) => window.location.replace("/furnitures"))
			.catch(({ emailError, passwordError }) => {
				setEmailErr(emailError);
				setPassErr(passwordError);
			});
	};

	const register = () => {
		AUTHENTICATION.Register(email, password)
			.then((a) => {
				setCredential(a);
				setStatus(202);
			})
			.catch(({ emailError, passwordError }) => {
				setEmailErr(emailError);
				setPassErr(passwordError);
				setStatus(204);
			});
	};

	const data = {
		actions: { login, register },
		setter: { setEmail, setPassword, setEmailErr, setPassErr },
		getter: { email, password, emailErr, passErr, status, credential },
	};

	return (
		<Switch>
			<Route path="/auth/login">
				<Login data={data} />
			</Route>
			<Route path="/auth/register">
				<Register data={data} />
			</Route>
			<Route path="/auth/">
				<Login data={data} />
			</Route>
		</Switch>
	);
};

export default Authentication;
