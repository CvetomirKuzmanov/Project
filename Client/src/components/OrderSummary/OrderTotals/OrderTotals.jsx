import React from 'react';
import './OrderTotals.css';

const OrderTotals = ({ subtotal, tax, total }) => {
    return (
        <div className="order-totals">
            <div className="total-row">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
            </div>
            <div className="total-row">
                <span>Tax (7%):</span>
                <span>${tax}</span>
            </div>
            <div className="total-row total">
                <span>Total:</span>
                <span>${total}</span>
            </div>
        </div>
    );
};

export default OrderTotals;