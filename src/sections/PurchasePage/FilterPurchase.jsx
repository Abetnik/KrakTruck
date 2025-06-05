import React from "react";
import styles from "./FilterPurchase.module.css";

const FilterPurchase = ({ selected, onSelect }) => {
  const categories = [
    { key: "all", label: "Wszystkie" },
    { key: "trucks", label: "Auta ciężarowe i ciągniki siodłowe" },
    { key: "engines", label: "Silniki i części" },
    { key: "trailers", label: "Naczepy i chłodnie" },
    { key: "vans", label: "Osobowe i dostawcze" },
    { key: "construction", label: "Maszyny budowlane i rolnicze" },
    { key: "buses", label: "Autobusy" },
    { key: "tires", label: "Opony i Felgi" },
  ];

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Nasze zapotrzebowania</h2>
      <p className={styles.subtext}>
        Wybierz kategorię sprzętu, którego aktualnie poszukujemy.
      </p>

      <div className={styles.filterGrid}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.filterButton} ${selected === cat.key ? styles.active : ""}`}
            onClick={() => onSelect(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilterPurchase;
