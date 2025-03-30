import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-container">
                    <div className="footer-col">
                        <h3>StyleHub</h3>
                        <p>Your one-stop destination for all your fashion needs. Discover the latest trends and styles.</p>
                        <div className="social-links">
                            <div className="social-link">f</div>
                            <div className="social-link">t</div>
                            <div className="social-link">in</div>
                            <div className="social-link">ig</div>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3>Shop</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><a href="#">Men's Clothing</a></li>
                            <li className="footer-link"><a href="#">Women's Clothing</a></li>
                            <li className="footer-link"><a href="#">Accessories</a></li>
                            <li className="footer-link"><a href="#">Footwear</a></li>
                            <li className="footer-link"><a href="#">New Arrivals</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Company</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><a href="#">About Us</a></li>
                            <li className="footer-link"><a href="#">Contact Us</a></li>
                            <li className="footer-link"><a href="#">Careers</a></li>
                            <li className="footer-link"><a href="#">Our Stores</a></li>
                            <li className="footer-link"><a href="#">Blog</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3>Help</h3>
                        <ul className="footer-links">
                            <li className="footer-link"><a href="#">FAQs</a></li>
                            <li className="footer-link"><a href="#">Shipping & Returns</a></li>
                            <li className="footer-link"><a href="#">Order Tracking</a></li>
                            <li className="footer-link"><a href="#">Size Guide</a></li>
                            <li className="footer-link"><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 StyleHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}