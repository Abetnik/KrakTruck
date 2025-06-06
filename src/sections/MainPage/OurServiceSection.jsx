import React from "react";
import styles from "./OurServiceSection.module.css";
import { useInView } from "../../hooks/useInView";
import { useLanguage } from "../../context/LanguageContext";

import TruckSalesIcon from "../../assets/images/MainPage/icons/TrukSales.png";
import ImportExportIcon from "../../assets/images/MainPage/icons/ImportExport.png";
import UsedTruckIcon from "../../assets/images/MainPage/icons/UsedTrucks.png";
import SparePartsIcon from "../../assets/images/MainPage/icons/SparePartsEngines.png";

const texts = {
  pl: {
    title: "Nasze usługi",
    sales: "Sprzedaż ciężarówek",
    importExport: "Import/Export",
    used: "Skup używanych\npojazdów",
    parts: "Części zamienne\n& Silniki",
  },
  en: {
    title: "Our Services",
    sales: "Truck Sales",
    importExport: "Import/Export",
    used: "Used Truck\nPurchase",
    parts: "Spare Parts\n& Engine",
  },
};

const OurServiceSection = () => {
  const { language } = useLanguage();
  const [ref, isVisible] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>{texts[language].title}</h2>
        <div className={styles.iconRow}>
          <div className={styles.iconBlock}>
            <img src={TruckSalesIcon} alt="Truck Sales" />
            <p>{texts[language].sales}</p>
          </div>
          <div className={styles.iconBlock}>
            <img src={ImportExportIcon} alt="Import/Export" />
            <p>{texts[language].importExport}</p>
          </div>
          <div className={styles.iconBlock}>
            <img src={UsedTruckIcon} alt="Used Truck Purchase" />
            <p dangerouslySetInnerHTML={{ __html: texts[language].used }} />
          </div>
          <div className={styles.iconBlock}>
            <img src={SparePartsIcon} alt="Spare Parts & Engine" />
            <p dangerouslySetInnerHTML={{ __html: texts[language].parts }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServiceSection;
