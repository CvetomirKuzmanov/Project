import './404.css'

export default function PageNotFound () {
    return (
        <section className="error-section">
        <div className="container">
            <div className="error-container">
                <div className="error-code">404</div>
                <h1 className="error-title">Page Not Found</h1>
                <p className="error-message">Oops! The page you're looking for doesn't exist or has been moved.</p>
                <div className="error-actions">
                    <a href="/" className="home-btn">Back to Home</a>
                </div>
            </div>
        </div>
    </section>
    );
}