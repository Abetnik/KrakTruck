import React from "react";
import styles from "./PurchaseCard.module.css";
import { Link } from "react-router-dom";

const PurchaseCard = ({ id, title, year, status, mainImage, image }) => {
  const isAvailable = status === "poszukiwane" || status === "available";

  return (
    <Link to={`/purchase/${id}`} className={styles.card}>
      <img src={mainImage || image} alt={title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.year}>{year}</p>
        <span
          className={`${styles.status} ${
            isAvailable ? styles.statusAvailable : styles.statusWanted
          }`}
        >
          {isAvailable ? "POSZUKIWANE" : "ZNALEZIONE"}
        </span>
      </div>
    </Link>
  );
};


export default PurchaseCard;
