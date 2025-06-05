import React from "react";
import styles from "./PurchaseItemHeader.module.css";

const PurchaseItemHeader = ({ title, mainImage, specs, description }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>
          <div className={styles.imageBlock}>
            {mainImage ? (
              <img src={mainImage} alt={title} />
            ) : (
              <div className={styles.imagePlaceholder}>Brak zdjęcia</div>
            )}
          </div>
          <div className={styles.infoBlock}>
            <h3>Specyfikacja</h3>
            <table className={styles.table}>
              <tbody>
                {specs.map((s, i) => (
                  <tr key={i}>
                    <td className={styles.key}>{s.key}</td>
                    <td className={styles.value}>{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className={styles.descTitle}>Opis</h3>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseItemHeader;
