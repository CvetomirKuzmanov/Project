import { useNavigate } from 'react-router-dom';
import { useCreateProduct } from '../../api/productApi';
import './createProduct.css'; 

export default function CreateProduct() {
  const navigate = useNavigate();
  const { create: createProduct } = useCreateProduct();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);


    const productData = Object.fromEntries(formData);
    await createProduct(productData);

    navigate('/catalog');
  };

  return (
    <div className="create-product-container">
      <section className="create-hero">
        <div className="container">
          <h1 className="create-title">Add New Product</h1>
          <p className="create-subtitle">Enter the details of your new product below</p>
        </div>
      </section>

      <section className="create-form-section">
        <div className="container">
          <div className="create-form-wrapper">
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Product Name:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter product name" 
                    required 
                  />
                </div>
                
                
                <div className="form-group">
                  <label htmlFor="price">Price ($):</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    min="0.01" 
                    step="0.01" 
                    placeholder="0.00" 
                    required 
                  />
                </div>
              
              </div>

              <div className="form-group full-width">
                <label htmlFor="image">Image URL:</label>
                <input 
                  type="url" 
                  id="image" 
                  name="image" 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Description:</label>
                <textarea 
                  id="description" 
                  name="description" 
                  rows="5" 
                  placeholder="Describe your product in detail..." 
                  required 
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/products')}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <section className="product-tips">
        <div className="container">
          <h2 className="section-title text-center">Tips for Great Product Listings</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">📝</div>
              <h3>Be Descriptive</h3>
              <p>Include fabric, dimensions, fit, and care instructions.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📷</div>
              <h3>Quality Images</h3>
              <p>Use high-resolution images from multiple angles.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">💲</div>
              <h3>Competitive Pricing</h3>
              <p>Research the market to price your items strategically.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">⭐</div>
              <h3>Highlight Features</h3>
              <p>Emphasize what makes your product special.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}