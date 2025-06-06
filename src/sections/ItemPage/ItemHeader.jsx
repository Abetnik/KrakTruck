import React from "react";
import styles from "./ItemHeader.module.css";
import { useLanguage } from "../../context/LanguageContext";

const ItemHeader = ({ titlePl, titleEn, title, mainImage, specs, descriptionPl, descriptionEn }) => {
  const { language } = useLanguage();
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{language === 'pl' ? (titlePl || title) : (titleEn || title)}</h1>
        <div className={styles.content}>
          <div className={styles.imageBlock}>
            <img src={mainImage} alt={title} />
          </div>
          <div className={styles.infoBlock}>
            <h3>Specifications</h3>
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

            <h3 className={styles.descTitle}>{language === 'pl' ? 'Opis' : 'Description'}</h3>
            <p className={styles.description}>
              {language === 'pl' ? (descriptionPl || descriptionEn) : (descriptionEn || descriptionPl)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemHeader;
