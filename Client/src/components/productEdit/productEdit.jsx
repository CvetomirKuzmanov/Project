import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProduct, useEditProduct } from '../../api/productApi';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import './productEdit.css';

export default function ProductEdit() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { product, isLoading } = useProduct(productId);
    const { edit } = useEditProduct();
    const { isAuthenticated, userId } = useAuth();
    const isOwner = userId === product._ownerId;

    const [formValues, setFormValues] = useState({
        name: String,
        price: Number,
        image: String,
        description: String
    });

    useEffect(() => {
        if (product && !isLoading && userId) {
            setFormValues({
                name: product.name || '',
                price: product.price || '',
                image: product.image || '',
                description: product.description || ''
            });
        }
    }, [product, isLoading, userId, productId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isAuthenticated) {
            toast.error('You must be logged in to update a product');
            return;
        }

        try {
            await edit(productId, formValues);
            toast.success('Product updated successfully');
            navigate(`/products/${productId}/details`);
        } catch (error) {
            toast.error('Failed to update product');
            console.error(error);
        }
    };

    if (isLoading) {
        return <div className="pe-loading-spinner">Loading...</div>;
    }

    return (
        <div>
            {isOwner ? (
                <div className="pe-edit-product-container">
                    <h1 className="pe-edit-title">Edit Product</h1>

                    <div className="pe-edit-layout">
                        <div className="pe-product-preview-panel">
                            <h2>Live Preview</h2>
                            <div className="pe-preview-product-card">
                                <div className="pe-preview-product-image">
                                    {formValues.image ? (
                                        <img src={formValues.image} alt={formValues.name} />
                                    ) : (
                                        <div className="pe-no-image-placeholder">No Image Available</div>
                                    )}
                                </div>
                                <div className="pe-preview-product-details">
                                    <h3 className="pe-preview-product-title">{formValues.name || 'Product Name'}</h3>
                                    <div className="pe-preview-product-pricing">
                                        <span className="pe-preview-product-current-price">
                                            ${parseFloat(formValues.price || 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="pe-preview-product-description">
                                            {formValues.description || 'Product description will appear here...'}
                                        </p>
                                        <div className="pe-preview-product-actions">
                                            <div className="pe-preview-product-action-button" data-pe-button="add-to-cart">🛒 Add To Cart</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pe-edit-form-panel">
                            <div className="pe-edit-form-wrapper">
                                <form onSubmit={handleSubmit} className="pe-product-form">
                                    <div className="pe-form-grid">
                                        <div className="pe-form-group">
                                            <label htmlFor="name">Product Name:</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter product name"
                                                required
                                            />
                                        </div>

                                        <div className="pe-form-group">
                                            <label htmlFor="price">Price ($):</label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                min="0.01"
                                                step="0.01"
                                                value={formValues.price}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pe-form-group pe-full-width">
                                        <label htmlFor="image">Image URL:</label>
                                        <input
                                            type="url"
                                            id="image"
                                            name="image"
                                            value={formValues.image}
                                            onChange={handleInputChange}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div className="pe-form-group pe-full-width">
                                        <label htmlFor="description">Description:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows="5"
                                            value={formValues.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe your product in detail..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="pe-form-actions">
                                        <button
                                            type="button"
                                            className="pe-cancel-btn"
                                            data-pe-button="cancel"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="pe-submit-btn"
                                            data-pe-button="submit"
                                            onClick={() => navigate(`/catalog`)}
                                        >
                                            Update Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <section className="pe-product-tips">
                        <div className="pe-container">
                            <h2 className="pe-section-title pe-text-center">Tips for Great Product Listings</h2>
                            <div className="pe-tips-grid">
                                <div className="pe-tip-card">
                                    <div className="pe-tip-icon">📝</div>
                                    <h3>Be Descriptive</h3>
                                    <p>Include fabric, dimensions, fit, and care instructions.</p>
                                </div>
                                <div className="pe-tip-card">
                                    <div className="pe-tip-icon">📷</div>
                                    <h3>Quality Images</h3>
                                    <p>Use high-resolution images from multiple angles.</p>
                                </div>
                                <div className="pe-tip-card">
                                    <div className="pe-tip-icon">💲</div>
                                    <h3>Competitive Pricing</h3>
                                    <p>Research the market to price your items strategically.</p>
                                </div>
                                <div className="pe-tip-card">
                                    <div className="pe-tip-icon">⭐</div>
                                    <h3>Highlight Features</h3>
                                    <p>Emphasize what makes your product special.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div>
                    you don't have permission
                </div>
            )}
        </div>
    );
}