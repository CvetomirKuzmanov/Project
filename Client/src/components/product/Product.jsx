import './Product.css'
import { Link } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

export default function Product(product) {
    const { addToCart } = useStore();
    const { isAuthenticated } = useAuth();

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }
        addToCart(product.name);
    };

    return (
        <div className="product-card" key={product.name}>
            <div className="product-img">
                <Link to={`/products/${product.name}/details`}><img src={product.img} alt={product.name} /></Link>
                <div className="product-actions">
                    <Link to={`/products/${product.name}/details`}><div className="product-action-btn">👁️</div></Link>
                    <div className="product-action-btn">❤️</div>
                    <div className="product-action-btn" onClick={handleAddToCart}>🛒</div>
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