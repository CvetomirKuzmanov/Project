import './Home.css'

import { Link } from "react-router";
import { useLatestProducts } from '../../api/productApi';

export default function Home() {


    const { latestProducts } = useLatestProducts();


    return (
        <div>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Summer Collection 2025</h1>
                        <p className="hero-description">Discover the latest trends in fashion and explore our new collection of clothing that defines style and comfort.</p>
                        <a href="/catalog" className="hero-btn">Shop Now</a>
                    </div>
                </div>
            </section>


            <section className="products">
                <div className="container">
                    <h2 className="section-title">Featured Products</h2>
                    <div className="product-grid">



                        {latestProducts.map(product => (
                            <div className="product-card" key={product.name}>
                                <div className="product-img">
                                    {product.image}
                                    <div className="product-actions">
                                        <Link to={`/products/${product.name}/details`}><div className="product-action-btn">👁️</div></Link>
                                        <div className="product-action-btn">❤️</div>
                                        <div className="product-action-btn">🛒</div>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-price">
                                        <span className="current-price">${product.price}</span>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}