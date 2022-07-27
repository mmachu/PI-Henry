import React from "react";
import { useSelector } from "react-redux";
import styles from "./pagination.module.css";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({ handlePageChange, currentPage, actualRecipes }) => {
  //const recipes = useSelector((state) => state.loadedRecipes);

  const handlePageAmount = () => {
    const pagesAmount = Math.ceil(actualRecipes.length / 9);
    const pagesAmountArr = [];
    for (let i = 0; i < pagesAmount; i++) {
      pagesAmountArr.push(i + 1);
    }
    return pagesAmountArr.map((pageNumber) => {
      return (
        <li
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`${styles.paginationItem} ${
            pageNumber === currentPage ? styles.activePage : ""
          }`}
        >
          {pageNumber}
        </li>
      );
    });
  };

  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(Math.ceil(actualRecipes.length / 9));
  };

  return (
    <nav className={styles.paginationNav} aria-label="pagination">
      <ul className={styles.pagination}>
        {actualRecipes && (
          <li onClick={goToFirstPage} className={styles.paginationItem}>
            <span aria-hidden="true">«</span>
          </li>
        )}

        {handlePageAmount()}

        {actualRecipes && (
          <li onClick={goToLastPage} className={styles.paginationItem}>
            <span aria-hidden="true">»</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
