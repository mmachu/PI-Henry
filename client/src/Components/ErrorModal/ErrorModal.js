import React from "react";
import styles from "./errormodal.module.css";
import { RiCloseLine } from "react-icons/ri";

const ErrorModal = ({ setIsOpen, error, setError }) => {
  const handleClose = () => {
    setIsOpen(false);
    setError("");
  };

  return (
    <>
      <div className={styles.darkBG} onClick={handleClose} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={handleClose}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
