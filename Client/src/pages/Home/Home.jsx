import './Home.css';
import { useLatestProducts } from '../../api/productApi';
import Product from '../../components/product/Product';

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
            {latestProducts && latestProducts.length > 0 ? (
              latestProducts.map(product => (
                <Product
                  key={product.name}
                  {...product}
                />
              ))
            ) : (
              <div className="no-products-message">
                <p>No products available at the moment.</p>
                <p>Please check back later for our latest arrivals.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}