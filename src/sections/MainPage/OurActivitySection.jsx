import React from "react";
import styles from "./OurActivitySection.module.css";
import { useInView } from "../../hooks/useInView";

import Audi from "../../assets/images/MainPage/logos/Audi.png";
import BMW from "../../assets/images/MainPage/logos/BMW.png";
import BOMAG from "../../assets/images/MainPage/logos/BOMAG.png";
import CAT from "../../assets/images/MainPage/logos/CAT.png";
import DAF from "../../assets/images/MainPage/logos/DAF.png";
import DYNAPAC from "../../assets/images/MainPage/logos/DYNAPAC.png";
import IVECO from "../../assets/images/MainPage/logos/IVECO.png";
import JCB from "../../assets/images/MainPage/logos/JCB.png";
import Kaessbohrer from "../../assets/images/MainPage/logos/Kaessbohrer.png";
import KOMATSU from "../../assets/images/MainPage/logos/KOMATSU.png";
import KRONE from "../../assets/images/MainPage/logos/KRONE.png";
import MAN from "../../assets/images/MainPage/logos/MAN.png";
import MBenz from "../../assets/images/MainPage/logos/mbenz.png";
import RENAULT from "../../assets/images/MainPage/logos/RENAULT.png";
import Scania from "../../assets/images/MainPage/logos/Scania.png";
import SCHMITZ from "../../assets/images/MainPage/logos/SCHMITZ.png";
import SKODA from "../../assets/images/MainPage/logos/SKODA.png";
import Toyota from "../../assets/images/MainPage/logos/Toyota.png";
import VOGELE from "../../assets/images/MainPage/logos/VOGELE.png";
import VolksWagen from "../../assets/images/MainPage/logos/VolksWagen.png";
import Volvo from "../../assets/images/MainPage/logos/Volvo.png";


const logos = [
  BMW, DAF, SKODA, BOMAG, Volvo,
  RENAULT, Kaessbohrer, Audi, CAT, DYNAPAC,
  Toyota, IVECO, MBenz, KRONE, Scania,
  KOMATSU, VolksWagen, SCHMITZ, JCB, VOGELE, MAN
];

const OurActivitySection = () => {
  const [ref, isVisible] = useInView(0.3);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
      style={{
        '--section-margin-top': '2.25rem',     // 100px
        '--section-margin-bottom': '2.25rem'   // 100px
      }}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Our Activity</h2>
        <p className={styles.description}>
          We deal with a wide variety of vehicles and equipment, with a focus on the following brands:
        </p>
        <div className={styles.logoGrid}>
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              className={`${styles.logo} ${isVisible ? styles.animate : ""}`}
              style={{ "--i": index }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurActivitySection;
