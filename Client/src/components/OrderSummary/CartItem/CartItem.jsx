import React from 'react';
import './CartItem.css';

const CartItem = ({ product, onRemove }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-img">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="cart-item-details">
                <a>{product.name}</a>
                <div className="cart-item-price">
                    <span className="price">${product.price}</span>
                </div>
            </div>
            <div className="remove-item-wrapper">
                <span
                    className="remove-item-x"
                    onClick={() => onRemove(product._id)}
                >
                    &times;
                </span>
            </div>
        </div>
    );
};

export default CartItem;