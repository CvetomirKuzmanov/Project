import { useNavigate, useParams } from 'react-router';
import { useCreateProduct, useProduct } from '../../api/productApi';
import useAuth from "../../hooks/useAuth";
import './productDetails.css'; 

export default function ProductDetails() {
  const navigate = useNavigate();
  const { email, userId } = useAuth()
  const { productId } = useParams();
  const { product } = useProduct(productId);


  return (
  <div className="container">
    <div className="product-details-container">
      <div className="product-header">
        <h1 className="product-title">{product.name}</h1>
        <div className="product-price">${product.price}</div>
      </div>

      {/* <div className="product-url">
        <a href="{product.url}" target="_blank">
          View Product Page
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 5px;">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div> */}

      <div className="product-description">
        {product.description}
      </div>

      <div className="product-actions">
        <button className="action-btn primary-btn">Add to Cart</button>
        <button className="action-btn secondary-btn">Add to Wishlist</button>
{/* 
        {isOwner && (
          <div className="owner-controls">
            <button className="action-btn secondary-btn">Edit</button>
            <button className="action-btn secondary-btn">Delete</button>
          </div>
        )} */}
      </div>
    </div>
  </div>
);
}