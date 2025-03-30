import { useNavigate } from 'react-router-dom';
import { useCreateProduct } from '../../api/productApi';
import './productDetails.css'; // Component-based CSS

export default function ProductDetails() {
  const navigate = useNavigate();
  const { create: createProduct } = useCreateProduct();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    await createProduct(productData);
    console.log(productData);
    navigate('/catalog');
  };

  // Common categories for an e-commerce store
  const categories = [
    "Clothing",
    "Footwear",
    "Accessories",
    "Electronics",
    "Home & Kitchen",
    "Beauty",
    "Sports"
  ];

  // Size options based on category
  const sizeOptions = {
    Clothing: ["XS", "S", "M", "L", "XL", "XXL"],
    Footwear: ["5", "6", "7", "8", "9", "10", "11", "12"],
    default: ["One Size"]
  };

  return (
    <div className="product-page-container">
      <section className="product-hero">
        <div className="container">
          <h1 className="product-title">Add New Product</h1>
          <p className="product-subtitle">Enter the details for your new item</p>
        </div>
      </section>

      <section className="product-form-section">
        <div className="container">
          <div className="product-form-wrapper">
            <form onSubmit={handleSubmit} className="product-form">
              {/* Basic Product Information */}
              <div className="form-section">
                <h2 className="form-section-title">Basic Information</h2>
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
                    <label htmlFor="category">Category:</label>
                    <select 
                      id="category" 
                      name="category" 
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category.toLowerCase()}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-grid">
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
                  
                  <div className="form-group">
                    <label htmlFor="inventory">Inventory Quantity:</label>
                    <input 
                      type="number" 
                      id="inventory" 
                      name="inventory" 
                      min="0" 
                      placeholder="0" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="form-section">
                <h2 className="form-section-title">Product Details</h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input 
                      type="text" 
                      id="brand" 
                      name="brand" 
                      placeholder="Enter brand name" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="sku">SKU:</label>
                    <input 
                      type="text" 
                      id="sku" 
                      name="sku" 
                      placeholder="Stock Keeping Unit" 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Available Sizes:</label>
                  <div className="size-options">
                    {sizeOptions.Clothing.map(size => (
                      <div key={size} className="checkbox-item">
                        <input 
                          type="checkbox" 
                          id={`size-${size}`} 
                          name="sizes" 
                          value={size} 
                        />
                        <label htmlFor={`size-${size}`}>{size}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Available Colors:</label>
                  <div className="color-options">
                    {["Black", "White", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Gray", "Brown"].map(color => (
                      <div key={color} className="color-option">
                        <input 
                          type="checkbox" 
                          id={`color-${color}`} 
                          name="colors" 
                          value={color} 
                        />
                        <label htmlFor={`color-${color}`} style={{backgroundColor: color.toLowerCase()}}>
                          <span className="color-name">{color}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Media Section */}
              <div className="form-section">
                <h2 className="form-section-title">Product Media</h2>
                
                <div className="form-group">
                  <label htmlFor="image">Main Image URL:</label>
                  <input 
                    type="url" 
                    id="image" 
                    name="image" 
                    placeholder="https://example.com/image.jpg" 
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="additionalImages">Additional Images (comma separated URLs):</label>
                  <input 
                    type="text" 
                    id="additionalImages" 
                    name="additionalImages" 
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" 
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="form-section">
                <h2 className="form-section-title">Product Description</h2>
                
                <div className="form-group">
                  <label htmlFor="shortDescription">Short Description:</label>
                  <input 
                    type="text" 
                    id="shortDescription" 
                    name="shortDescription" 
                    placeholder="Brief product description" 
                    maxLength="150"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Full Description:</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    rows="5" 
                    placeholder="Describe your product in detail..." 
                    required 
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="features">Key Features (one per line):</label>
                  <textarea 
                    id="features" 
                    name="features" 
                    rows="4" 
                    placeholder="Enter product features, one per line..." 
                  ></textarea>
                </div>
              </div>

              {/* Product Options */}
              <div className="form-section">
                <h2 className="form-section-title">Product Options</h2>
                
                <div className="form-group">
                  <label>Product Tags:</label>
                  <div className="tags-input">
                    <input 
                      type="text" 
                      id="tags" 
                      name="tags" 
                      placeholder="Add tags separated by commas" 
                    />
                  </div>
                </div>
                
                <div className="form-group checkboxes">
                  <div className="checkbox-item">
                    <input type="checkbox" id="featured" name="isFeatured" value="true" />
                    <label htmlFor="featured">Featured Product</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="newArrival" name="isNewArrival" value="true" />
                    <label htmlFor="newArrival">New Arrival</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="onSale" name="isOnSale" value="true" />
                    <label htmlFor="onSale">On Sale</label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => navigate('/catalog')}>
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