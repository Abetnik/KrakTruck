import React from "react";
import styles from "./ItemSuggestions.module.css";
import { Link } from "react-router-dom";

const ItemSuggestions = ({ currentId, currentType, currentCategory }) => {
  const allItems = JSON.parse(localStorage.getItem("items") || "[]");

  const suggestions = allItems
    .filter(
      (item) =>
        item.id !== currentId &&
        item.type === currentType &&
        item.category === currentCategory
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, 4); // max 4 suggestions

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>You may also be interested in</h2>

        {suggestions.length > 0 ? (
          <div className={styles.grid}>
            {suggestions.map((item) => (
              <Link
                to={`/${item.type}/${item.id}`}
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
          <p className={styles.empty}>
            More offers will appear here soon.
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemSuggestions;
