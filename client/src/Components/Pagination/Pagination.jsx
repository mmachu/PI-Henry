import React from "react";
import styles from "./pagination.module.css";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = () => {
  return (
    <nav className={styles.paginationNav} aria-label="pagination">
      <ul className={styles.pagination}>
        <li className={styles.paginationItem}>
          <a href="">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        <li className={styles.paginationItem}>
          <a href="">1</a>
        </li>
        <li className={styles.paginationItem}>
          <a href="" aria-current="page">
            2
          </a>
        </li>
        <li className={styles.paginationItem}>
          <a href="">3</a>
        </li>
        <li className={styles.paginationItem}>
          <a href="">4</a>
        </li>
        <li className={styles.paginationItem}>
          <a href="">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
