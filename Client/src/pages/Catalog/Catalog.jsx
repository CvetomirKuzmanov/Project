import React, { useState, useEffect } from 'react';
import './Catalog.css';
import Search from '../../components/search/Search';
import { useProducts } from '../../api/productApi';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination/Pagination';

export default function Catalog() {
    const { getProducts } = useProducts();
    const [products, setProducts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [sortType, setSortType] = useState('Featured');
    const [searchFilters, setSearchFilters] = useState({
        term: '',
        priceRange: { min: 0 }
    });
    const itemsPerPage = 3;

    useEffect(() => {
        if (getProducts.length > 0) {
            setProducts([...getProducts]);
        }
    }, [getProducts]);

    const getFilteredAndSortedProducts = () => {
        let result = [...products];
        
        if (searchFilters.term && searchFilters.term.trim() !== '') {
            const term = searchFilters.term.toLowerCase().trim();
            result = result.filter(product => 
                (product.name && product.name.toLowerCase().includes(term)) ||
                (product.description && product.description.toLowerCase().includes(term))
            );
        }
        
        if (searchFilters.priceRange) {
            result = result.filter(product => 
                product.price >= searchFilters.priceRange.min
            );
        }
        
        switch(sortType) {
            case 'Price: Low to High':
                result.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'Price: High to Low':
                result.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'Name: A to Z':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name: Z to A':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
        
        return result;
    };

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortType(sortValue);
    };

    const handleSearch = (term) => {
        setSearchFilters(prev => ({
            ...prev,
            term
        }));
    };

    const handlePriceFilter = (priceRange) => {
        setSearchFilters(prev => ({
            ...prev,
        }));
    };

    const handleClearFilters = () => {
        setSearchFilters({
            term: '',
            priceRange: { min: 0 }
        });
    };

    const filteredProducts = getFilteredAndSortedProducts();
    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
        window.scrollTo(0, 0);
    };

    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog-container">
                    <Search 
                        onSearch={handleSearch}
                        onPriceFilter={handlePriceFilter}
                        onClearFilters={handleClearFilters}
                    />
                    <div className="catalog-content">
                        <div className="catalog-header">
                            <h1>All Products</h1>
                            <div className="catalog-tools">
                                <div className="catalog-sort">
                                    <label htmlFor="sort-by">Sort by:</label>
                                    <select 
                                        id="sort-by" 
                                        className="sort-select"
                                        value={sortType}
                                        onChange={handleSortChange}
                                    >
                                        <option>Featured</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Name: A to Z</option>
                                        <option>Name: Z to A</option>
                                    </select>
                                </div>
                                <div className="catalog-view">
                                    <button className="view-btn active">☰</button>
                                    <button className="view-btn">⊞</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="product-grid catalog-grid">
                            {currentProducts.length > 0 ? (
                                currentProducts.map(product => (
                                    <div key={product.id || product.name}>
                                        <Product {...product} />
                                    </div>
                                ))
                            ) : (
                                <div className="no-products-message">
                                    <p>No products match your search criteria.</p>
                                </div>
                            )}
                        </div>
                        
                        {filteredProducts.length > 0 && (
                            <Pagination 
                                pageCount={pageCount} 
                                onPageChange={handlePageClick} 
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}