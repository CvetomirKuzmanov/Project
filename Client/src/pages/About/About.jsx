import './About.css'

export default function About() {
    return (
        <div>
            <section className="about-hero">
                <div className="container">
                    <div className="about-hero-content">
                        <h1 className="about-title">Our Story</h1>
                        <p className="about-subtitle">Discover who we are and what we stand for</p>
                    </div>
                </div>
            </section>

            <section className="about-content">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image">
                            <div className="placeholder-image">Our Store Image</div>
                        </div>
                        <div className="about-text">
                            <h2 className="section-title">Who We Are</h2>
                            <p>Founded in 2020, StyleHub is a modern fashion retailer dedicated to bringing you the latest trends and timeless classics. We believe that style is a form of self-expression, and our mission is to help you express yourself through fashion.</p>
                            <p>What started as a small boutique in downtown has now grown into a global brand, but our commitment to quality and customer satisfaction remains unchanged.</p>
                            <p>At StyleHub, we carefully curate each collection to ensure that we offer something for everyone, regardless of age, size, or personal style preferences.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Join the StyleHub Community</h2>
                        <p className="cta-description">Discover our exclusive collections and be the first to know about our latest arrivals and special offers.</p>
                        <a href="shop.html" className="cta-btn">Shop Now</a>
                    </div>
                </div>
            </section>

            <section className="mission-values">
                <div className="container">
                    <h2 className="section-title text-center">Our Mission & Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🌿</div>
                            <h3>Sustainability</h3>
                            <p>We're committed to reducing our environmental footprint through responsible sourcing and ethical manufacturing practices.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">👥</div>
                            <h3>Inclusivity</h3>
                            <p>Fashion is for everyone. We design and select products that cater to diverse body types, styles, and preferences.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">💎</div>
                            <h3>Quality</h3>
                            <p>We never compromise on quality. Each item is carefully inspected to ensure it meets our high standards.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🔄</div>
                            <h3>Innovation</h3>
                            <p>We constantly evolve and adapt to bring you the latest trends and innovations in the fashion industry.</p>
                        </div>
                    </div>
                </div>
            </section>


        </div>

    );
}