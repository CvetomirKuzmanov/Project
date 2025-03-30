import './Login.css'

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../api/authApi";
import { UserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';

export default function Login() {
	const navigate = useNavigate();
	const { userLoginHandler } = useContext(UserContext);
	const { login } = useLogin();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const loginAction = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		try {
			const authData = await login(email, password);
			userLoginHandler(authData);
			toast.success('Successful Login');
			navigate(-1);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="login-section">
			<div className="container">
				<div className="auth-container">
					<div className="auth-tabs">
						<div onClick={() => navigate("/login")} className="auth-tab active">Sign In</div>
						<div onClick={() => navigate("/register")} className="auth-tab">Create Account</div>
					</div>
					<div className="login-content">
						<h1>Sign In</h1>
						<p className="login-subtitle">Welcome back to your StyleHub account</p>
						<form id="login" onSubmit={loginAction} className="login-form">
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input type="email" id="email" required />
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input type="password" id="password" required />
							</div>
							<input
								type="submit"
								className="primary-btn"
								defaultValue="Sign In"
								disabled={isSubmitting}
							/>
						</form>
						<p className="register-link">Don't have an account? <Link to="/register">Here</Link></p>
					</div>
				</div>
			</div>
		</section>
	);
}