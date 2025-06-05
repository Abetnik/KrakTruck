import React from "react";
import ItemCard from "./ItemCard";
import styles from "./ItemArea.module.css";
import { useInView } from "../../hooks/useInView";

const ItemArea = ({ items }) => {
  const [ref, isVisible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`${styles.wrapper} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        {items.length > 0 ? (
          <div className={styles.grid}>
  {items.map((item, index) => (
            <div
              key={item.id}
              className={styles.cardWrapper}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        ) : (
          <p className={styles.empty}>Brak wyników dla tej kategorii.</p>
        )}
      </div>
    </section>
  );
};

export default ItemArea;
