import { Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";
import PageNotFound from "./pages/404/404";
import Home from "./pages/Home/Home";
import AuthGuard from './components/guards/AuthGuard'
import GuestGuard from './components/guards/GuestGuard'

import UserProvider from './providers/UserProvider'
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import CreateProduct from './pages/createProduct/createProduct';
import ProductDetails from './pages/productDetails/productDetails';


function App() {
	return (
		<UserProvider>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path="/details" element={<ProductDetails />} />
				<Route path="/about" element={<About />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route element={<AuthGuard />}>
					<Route path="/logout" element={<Logout />} />
					<Route path="/create" element={<CreateProduct />} />]
				</Route>

				<Route element={<GuestGuard />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>



				<Route path='*' element={<PageNotFound />} />
			</Routes >
			<Footer />

			<ToastContainer />
		</UserProvider>
	
		
);
}

export default App;