import React from "react";
import styles from "./ItemCard.module.css";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { id, title, year, status, mainImage } = item;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={mainImage} alt={title} className={styles.image} />
        <span
          className={`${styles.status} ${
            status === "sold" ? styles.sold : styles.available
          }`}
        >
          {status === "sold" ? "SOLD" : "AVAILABLE"}
        </span>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.year}>{year}</p>
        <Link to={`/sale/${id}`} className={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
