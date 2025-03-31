import './Product.css'

import { Link } from 'react-router';

export default function Product(product) {


    return (
        <div className="product-card" key={product.name}>
            <div className="product-img">
                <Link to={`/products/${product.name}/details`}><img src={product.img} alt={product.name} /></Link>
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
    );
}