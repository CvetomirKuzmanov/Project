import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

export default function Pagination({ pageCount, onPageChange, pageRangeDisplayed = 3, marginPagesDisplayed = 1 }) {
  if (pageCount <= 1) return null;
  
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageLinkClassName="pagination-number"
      previousLinkClassName="pagination-arrow"
      nextLinkClassName="pagination-arrow"
      activeLinkClassName="active"
      breakClassName="pagination-dots"
    />
  );
}