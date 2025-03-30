export default function Search() {
    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog-container">
                    <div className="catalog-sidebar">
                        <div className="search-box">
                            <h3>Search Products</h3>
                            <div className="search-input-container">
                                <input type="text" placeholder="Search..." className="search-input" />
                                    <button className="search-btn">🔍</button>
                            </div>
                        </div>

                        <div className="filter-section">
                            <h3>Categories</h3>
                            <ul className="filter-list">
                                <li>
                                    <label className="filter-checkbox">
                                        <input type="checkbox" /> Men's Clothing
                                    </label>
                                </li>
                                <li>
                                    <label className="filter-checkbox">
                                        <input type="checkbox" /> Women's Clothing
                                    </label>
                                </li>
                                <li>
                                    <label className="filter-checkbox">
                                        <input type="checkbox" /> Accessories
                                    </label>
                                </li>
                                <li>
                                    <label className="filter-checkbox">
                                        <input type="checkbox" /> Footwear
                                    </label>
                                </li>
                            </ul>
                        </div>

                        <div className="filter-section">
                            <h3>Price Range</h3>
                            <div className="price-range">
                                <input type="range" min="0" max="200" defaultValue="100" className="price-slider" />
                                    <div className="price-inputs">
                                        <input type="number" placeholder="Min" className="price-input" min="0" />
                                            <span>-</span>
                                            <input type="number" placeholder="Max" className="price-input" min="0" /> 
                                            </div>
                                    </div>
                            </div>

                            <div className="filter-section">
                                <h3>Size</h3>
                                <div className="size-options">
                                    <div className="size-option">XS</div>
                                    <div className="size-option">S</div>
                                    <div className="size-option">M</div>
                                    <div className="size-option">L</div>
                                    <div className="size-option">XL</div>
                                    <div className="size-option">XXL</div>
                                </div>
                            </div>

                            <div className="filter-section">
                                <h3>Ratings</h3>
                                <ul className="filter-list">
                                    <li>
                                        <label className="filter-checkbox">
                                            <input type="checkbox" /> ⭐⭐⭐⭐⭐ & up
                                        </label>
                                    </li>
                                    <li>
                                        <label className="filter-checkbox">
                                            <input type="checkbox" /> ⭐⭐⭐⭐ & up
                                        </label>
                                    </li>
                                    <li>
                                        <label className="filter-checkbox">
                                            <input type="checkbox" /> ⭐⭐⭐ & up
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <button className="apply-filter-btn">Apply Filters</button>
                            <button className="clear-filter-btn">Clear All</button>
                        </div>

                        <div className="catalog-content">
                            <div className="catalog-header">
                                <h1>All Products</h1>
                                <div className="catalog-tools">
                                    <div className="catalog-sort">
                                        <label htmlFor="sort-by">Sort by:</label>
                                        <select id="sort-by" className="sort-select">
                                            <option>Featured</option>
                                            <option>Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                            <option>Newest</option>
                                            <option>Best Selling</option>
                                        </select>
                                    </div>
                                    <div className="catalog-view">
                                        <button className="view-btn active">☰</button>
                                        <button className="view-btn">⊞</button>
                                    </div>
                                </div>
                            </div>

                            <div className="product-grid catalog-grid">
                                <div className="product-card">
                                    <div className="product-img">
                                        Product Image
                                        <div className="product-tag">New</div>
                                        <div className="product-actions">
                                            <div className="product-action-btn">👁️</div>
                                            <div className="product-action-btn">❤️</div>
                                            <div className="product-action-btn">🛒</div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">Cotton T-Shirt with Print</h3>
                                        <div className="product-price">
                                            <span className="current-price">$29.99</span>
                                            <span className="old-price">$39.99</span>
                                        </div>
                                        <div className="product-rating">⭐⭐⭐⭐⭐ (24)</div>
                                    </div>
                                </div>

                                <div className="product-card">
                                    <div className="product-img">
                                        Product Image
                                        <div className="product-tag">Sale</div>
                                        <div className="product-actions">
                                            <div className="product-action-btn">👁️</div>
                                            <div className="product-action-btn">❤️</div>
                                            <div className="product-action-btn">🛒</div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">Denim Jacket with Buttons</h3>
                                        <div className="product-price">
                                            <span className="current-price">$59.99</span>
                                            <span className="old-price">$79.99</span>
                                        </div>
                                        <div className="product-rating">⭐⭐⭐⭐ (18)</div>
                                    </div>
                                </div>

                                <div className="product-card">
                                    <div className="product-img">
                                        Product Image
                                        <div className="product-actions">
                                            <div className="product-action-btn">👁️</div>
                                            <div className="product-action-btn">❤️</div>
                                            <div className="product-action-btn">🛒</div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">Slim Fit Chino Pants</h3>
                                        <div className="product-price">
                                            <span className="current-price">$44.99</span>
                                        </div>
                                        <div className="product-rating">⭐⭐⭐⭐⭐ (32)</div>
                                    </div>
                                </div>

                                <div className="product-card">
                                    <div className="product-img">
                                        Product Image
                                        <div className="product-tag">Hot</div>
                                        <div className="product-actions">
                                            <div className="product-action-btn">👁️</div>
                                            <div className="product-action-btn">❤️</div>
                                            <div className="product-action-btn">🛒</div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">Summer Floral Dress</h3>
                                        <div className="product-price">
                                            <span className="current-price">$49.99</span>
                                            <span className="old-price">$64.99</span>
                                        </div>
                                        <div className="product-rating">⭐⭐⭐⭐ (15)</div>
                                    </div>
                                </div>

                                <div className="product-card">
                                    <div className="product-img">
                                        Product Image
                                        <div className="product-actions">
                                            <div className="product-action-btn">👁️</div>
                                            <div className="product-action-btn">❤️</div>
                                            <div className="product-action-btn">🛒</div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">Leather Crossbody Bag</h3>
                                        <div className="product-price">
                                            <span className="current-price">$79.99</span>
                                        </div>
                                        <div className="product-rating">⭐⭐⭐⭐ (9)</div>
                                    </div>
                                </div>

                                <div className="product-card">
                                    <div className="product-img">
                                        Product Image
                                        <div className="product-tag">Sale</div>
                                        <div className="product-actions">
                                            <div className="product-action-btn">👁️</div>
                                            <div className="product-action-btn">❤️</div>
                                            <div className="product-action-btn">🛒</div>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">Classic Oxford Shoes</h3>
                                        <div className="product-price">
                                            <span className="current-price">$89.99</span>
                                            <span className="old-price">$109.99</span>
                                        </div>
                                        <div className="product-rating">⭐⭐⭐⭐⭐ (27)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pagination">
                                <a href="#" className="pagination-arrow">←</a>
                                <a href="#" className="pagination-number active">1</a>
                                <a href="#" className="pagination-number">2</a>
                                <a href="#" className="pagination-number">3</a>
                                <span className="pagination-dots">...</span>
                                <a href="#" className="pagination-number">12</a>
                                <a href="#" className="pagination-arrow">→</a>
                            </div>
                        </div>
                    </div>
                </div>
        </section>

    );
}