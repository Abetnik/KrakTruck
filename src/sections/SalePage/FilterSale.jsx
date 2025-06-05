import React from "react";
import styles from "./FilterSale.module.css";

const FilterSale = ({ active, setActive }) => {
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
      <h2 className={styles.heading}>Nasze ogłoszenia</h2>
      <p className={styles.subtext}>
        Przeglądaj dostępne pojazdy i sprzęt według wybranej kategorii.
      </p>

      <div className={styles.filterGrid}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`${styles.filterButton} ${
              active === cat.key ? styles.active : ""
            }`}
            onClick={() => setActive(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilterSale;
