import React from "react";
import styles from "./errormodal.module.css";
import { RiCloseLine } from "react-icons/ri";

const ErrorModal = ({ setIsOpen, info, setInfo }) => {
  const handleClose = () => {
    setIsOpen(false);
    setInfo([]);
  };

  const renderError = () => {
    return (
      <ul className={styles.ul}>
        {info.map((err, index) => {
          return <li key={index}>{err}</li>;
        })}
      </ul>
    );
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
            <p>{renderError()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
