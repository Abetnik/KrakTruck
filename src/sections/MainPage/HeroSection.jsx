import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import TruckBackground from "../../assets/videos/TruckBackground.webm";
import { scrollToSection } from "../../hooks/scrollToSection";

const phrasesPL = [
  "AUTA CIĘŻAROWE – Skup i sprzedaż aut ciężarowych, ciągników siodłowych",
  "AUTA OSOBOWE – Skup i sprzedaż aut osobowych i dostawczych",
  "SILNIKI I CZĘŚCI – Skup i sprzedaż silników i części do wszystkich typów pojazdów",
  "MASZYNY BUDOWLANE – Skup i sprzedaż maszyn przemysłowych i rolniczych",
  "AUTOBUSY – Skup i sprzedaż autokarów, autobusów i busów",
  "NACZEPY – Skup i sprzedaż firanek, chłodni, cystern i innych",
  "OPONY I FELGI – Skup i sprzedaż opon, felg, dętek i ochraniaczy",
  "DEMONTAŻ I ZAŁADUNEK – Profesjonalny demontaż i załadunek pojazdów",
  "TRANSPORT – Organizacja transportu krajowego i międzynarodowego",
];

const HeroSection = ({ scrollTarget }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrasesPL.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (scrollTarget) scrollToSection(scrollTarget, 0.1);
  };

  return (
    <section className={styles.hero}>
      <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
        <source src={TruckBackground} type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.overlay}>
        <div className={styles.heroContainer}>
          <div className={styles.textBlock}>
            <h1 className={styles.title}>
              Reliable Solution<br />in the World of<br />Trucks
            </h1>

            <div className={styles.phraseBox}>
              <p className={`${styles.phrase} ${styles.fade}`} key={currentIndex}>
                {phrasesPL[currentIndex]}
              </p>
              <button className={styles.cta} onClick={handleClick}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
