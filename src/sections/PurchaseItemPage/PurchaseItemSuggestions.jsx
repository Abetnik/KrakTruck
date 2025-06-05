import React from "react";
import styles from "./PurchaseItemSuggestions.module.css";
import { Link } from "react-router-dom";

const PurchaseItemSuggestions = ({ currentId, currentType, currentCategory }) => {
  const allItems = JSON.parse(localStorage.getItem("items") || "[]");

  const suggestions = allItems
    .filter(
      (item) =>
        item.id !== currentId &&
        item.type === currentType &&
        item.category === currentCategory
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Szukamy również tego:</h2>

        {suggestions.length > 0 ? (
          <div className={styles.grid}>
            {suggestions.map((item) => (
              <Link
                to={`/purchase/${item.id}`}
                key={item.id}
                className={styles.card}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.year}>{item.year}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>Brak podobnych zapotrzebowań.</p>
        )}
      </div>
    </section>
  );
};

export default PurchaseItemSuggestions;
