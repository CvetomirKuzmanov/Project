import './Search.css'

export default function Search() {
    return (
        <div className="catalog-sidebar">
            <div className="search-box">
                <h3>Search Products</h3>
                <div className="search-input-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="search-btn">🔍</button>
                </div>
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


            <button className="apply-filter-btn">Apply Filters</button>
            <button className="clear-filter-btn">Clear All</button>
        </div>
    );
}