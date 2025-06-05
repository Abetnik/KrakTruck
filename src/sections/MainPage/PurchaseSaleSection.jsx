import React from "react";
import styles from "./PurchaseSaleSection.module.css";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";

import truckImage from "../../assets/images/MainPage/Vehicles.png";
import equipmentImage from "../../assets/images/MainPage/EquipmentParts.png";
import tiresImage from "../../assets/images/MainPage/Tires.png";

import TruckIcon from "../../assets/icons/Vehicles.svg";
import EquipmentIcon from "../../assets/icons/EquipmentParts.svg";
import TiresIcon from "../../assets/icons/Tires.svg";

const data = [
  {
    title: "Vehicles",
    description:
      "Cars, delivery vans, trucks, semi-trucks, and coaches — available new and used",
    icon: TruckIcon,
    image: truckImage,
  },
  {
    title: "Equipment & Parts",
    description:
      "Construction machinery, agricultural equipment, trailers, and engines. Engine and spare parts available.",
    icon: EquipmentIcon,
    image: equipmentImage,
  },
  {
    title: "Tires",
    description:
      "New and used tires for passenger cars, light commercial vehicles, and heavy-duty vehicles. New and used tires also available for paycars",
    icon: TiresIcon,
    image: tiresImage,
  },
];

const PurchaseSaleSection = () => {
  const [sectionRef, sectionVisible] = useInView(0.2);

  return (
    <section
        ref={sectionRef}
        className={`${styles.section} ${sectionVisible ? styles.visible : ""}`}
        style={{
          '--section-padding': '3rem 0' // по умолчанию, можешь редактировать
        }}
>
      <div className={styles.container}>
        {data.map((item, index) => {
          const [cardRef, isVisible] = useInView(0.3);

          return (
            <div
              ref={cardRef}
              key={index}
              className={`${styles.card} ${isVisible ? styles.animate : ""}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className={styles.contentWrapper}>
                <div className={styles.textBlock}>
                  <div className={styles.titleRow}>
                    <img src={item.icon} alt="" className={styles.icon} />
                    <h2 className={styles.title}>{item.title}</h2>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <div className={styles.imageBlock}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                  <div className={styles.buttons}>
                    <Link to="/purchase" className={styles.btn}>Purchase</Link>
                    <Link to="/sale" className={styles.btn}>Sale</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PurchaseSaleSection;
