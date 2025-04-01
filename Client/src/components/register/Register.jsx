import './Register.css'
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { useState } from 'react';
export default function Register() {
	const navigate = useNavigate();
	const { register } = useRegister();
	const { userLoginHandler } = useUserContext();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const registerHandler = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');


		if (password !== confirmPassword) {
			toast.error('Password mismatch');
			return;
		}
		try {
			const authData = await register(email, password);
			userLoginHandler(authData);
			navigate('/');
		} catch (err) {
			toast.error(err.message);
		} finally {
			setIsSubmitting(false)
		}

	}

	return (
		<section className="register-section">
			<div className="container">
				<div className="auth-container">
					<div className="auth-tabs">
						<div onClick={() => navigate("/login")} className="auth-tab">Sign In</div>
						<div onClick={() => navigate("/register")} className="auth-tab active">Create Account</div>
					</div>
					<div className="register-content">
						<h1>Create Your Account</h1>
						<p className="register-subtitle">Join StyleHub for a personalized shopping experience</p>
						<form className="register-form" onSubmit={registerHandler}>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input type="email" id="email" name="email" required />
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input type="password" id="password" name="password" required />
								<span className="password-hint">Password must be at least 8 characters</span>
							</div>
							<div className="form-group">
								<label htmlFor="confirm-password">Confirm Password</label>
								<input type="password" id="confirm-password" name="confirm-password" required />
							</div>
							<button type="submit" className="primary-btn">Create Account</button>
						</form>
						<p className="login-link" disabled={isSubmitting}>Already have an account? <Link to="/login">Sign In</Link></p>
					</div>
				</div>
			</div>
		</section>
	);
}