import React from "react";
import styles from "./AdminTypeSelector.module.css";

const AdminTypeSelector = ({ selectedTab, onSelectTab }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Wybierz typ ogłoszenia</h2>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${selectedTab === "sale" ? styles.active : ""}`}
            onClick={() => onSelectTab("sale")}
          >
            Sprzedaż
          </button>
          <button
            className={`${styles.tab} ${selectedTab === "purchase" ? styles.active : ""}`}
            onClick={() => onSelectTab("purchase")}
          >
            Zakup
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminTypeSelector;
