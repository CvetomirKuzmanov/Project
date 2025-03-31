import React, { useState } from 'react';
import './Catalog.css';
import Search from '../../components/search/Search';
import { useLatestProducts } from '../../api/productApi';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination/Pagination';

export default function Catalog() {
    const { latestProducts } = useLatestProducts();
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    // Calculate page details
    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = latestProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(latestProducts.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % latestProducts.length;
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
                            {currentProducts.map(product => (
                                <Product
                                    key={product.name}
                                    {...product}
                                />
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