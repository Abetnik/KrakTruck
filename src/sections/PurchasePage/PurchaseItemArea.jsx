import React from "react";
import styles from "./PurchaseItemArea.module.css";
import { useInView } from "../../hooks/useInView";
import PurchaseCard from "./PurchaseCard";

const PurchaseItemArea = ({ items }) => {
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
                    <PurchaseCard {...item} />
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

export default PurchaseItemArea;
