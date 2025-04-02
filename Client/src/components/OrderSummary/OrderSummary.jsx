import React from 'react';
import './OrderSummary.css';
import CartItem from './CartItem/CartItem';
import OrderTotals from './OrderTotals/OrderTotals';

const OrderSummary = ({ 
    cartData, 
    isLoading, 
    handleRemoveProduct, 
    calculateSubtotal, 
    calculateTax, 
    calculateTotal, 
    navigate 
}) => {
    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="cart-items">
                {isLoading ? (
                    <p>Loading cart items...</p>
                ) : cartData.length > 0 ? (
                    cartData.map(product => (
                        <CartItem 
                            key={product._id} 
                            product={product} 
                            onRemove={handleRemoveProduct} 
                        />
                    ))
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            {cartData.length > 0 && (
                <OrderTotals 
                    subtotal={calculateSubtotal()} 
                    tax={calculateTax()} 
                    total={calculateTotal()} 
                />
            )}
            
            <div className="checkout-actions">
                <a onClick={() => navigate('/catalog')} className="continue-shopping">
                    Continue Shopping
                </a>
                <button className="place-order-btn">Place Order</button>
            </div>
        </div>
    );
};

export default OrderSummary;