import React from 'react';
import './CheckoutSteps.css';

const CheckoutSteps = () => {
    return (
        <div className="checkout-header">
            <div className="checkout-steps">
                <div className="step active">
                    <div className="step-number">1</div>
                    <div className="step-name">Shopping Cart</div>
                </div>
                <div className="step active">
                    <div className="step-number">2</div>
                    <div className="step-name">Checkout Details</div>
                </div>
                <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-name">Complete Order</div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSteps;