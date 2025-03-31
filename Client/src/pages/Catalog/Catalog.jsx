import React, { useState, useEffect } from 'react';
import './Catalog.css';
import Search from '../../components/search/Search';
import { useLatestProducts } from '../../api/productApi';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination/Pagination';

export default function Catalog() {
    const { latestProducts } = useLatestProducts();
    const [products, setProducts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [sortType, setSortType] = useState('Featured');
    const itemsPerPage = 6;

    // Initialize products when data loads
    useEffect(() => {
        if (latestProducts.length > 0) {
            setProducts([...latestProducts]);
        }
    }, [latestProducts]);

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortType(sortValue);
        
        const sortedProducts = [...products];
        
        switch(sortValue) {
            case 'Price: Low to High':
                sortedProducts.sort((a, b) => Number(a.price - b.price));
                break;
            case 'Price: High to Low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'Name: A to Z':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name: Z to A':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        
        setProducts(sortedProducts);
    };

    // Calculate page details
    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        window.scrollTo(0, 0);
    };

    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog-container">
                    <Search />
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
                            {currentProducts.map(product => (
                                <div key={product.name}>
                                    <Product {...product} />
                                </div>
                            ))}
                        </div>
                        
                        <Pagination 
                            pageCount={pageCount} 
                            onPageChange={handlePageClick} 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}