import React from "react";
import styles from "./OurServiceSection.module.css";
import { useInView } from "../../hooks/useInView";

import TruckSalesIcon from "../../assets/images/MainPage/icons/TrukSales.png";
import ImportExportIcon from "../../assets/images/MainPage/icons/ImportExport.png";
import UsedTruckIcon from "../../assets/images/MainPage/icons/UsedTrucks.png";
import SparePartsIcon from "../../assets/images/MainPage/icons/SparePartsEngines.png";

const OurServiceSection = () => {
  const [ref, isVisible] = useInView(0.2);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Our Services</h2>
        <div className={styles.iconRow}>
          <div className={styles.iconBlock}>
            <img src={TruckSalesIcon} alt="Truck Sales" />
            <p>Truck Sales</p>
          </div>
          <div className={styles.iconBlock}>
            <img src={ImportExportIcon} alt="Import/Export" />
            <p>Import/Export</p>
          </div>
          <div className={styles.iconBlock}>
            <img src={UsedTruckIcon} alt="Used Truck Purchase" />
            <p>Used Truck<br />Purchase</p>
          </div>
          <div className={styles.iconBlock}>
            <img src={SparePartsIcon} alt="Spare Parts & Engine" />
            <p>Spare Parts<br />& Engine</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServiceSection;
