import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import TruckBackground from "../../assets/videos/TruckBackground.webm";
import { scrollToSection } from "../../hooks/scrollToSection";
import { useLanguage } from "../../context/LanguageContext";

const phrases = {
  pl: [
    "AUTA CIĘŻAROWE – Skup i sprzedaż aut ciężarowych, ciągników siodłowych",
    "AUTA OSOBOWE – Skup i sprzedaż aut osobowych i dostawczych",
    "SILNIKI I CZĘŚCI – Skup i sprzedaż silników i części do wszystkich typów pojazdów",
    "MASZYNY BUDOWLANE – Skup i sprzedaż maszyn przemysłowych i rolniczych",
    "AUTOBUSY – Skup i sprzedaż autokarów, autobusów i busów",
    "NACZEPY – Skup i sprzedaż firanek, chłodni, cystern i innych",
    "OPONY I FELGI – Skup i sprzedaż opon, felg, dętek i ochraniaczy",
    "DEMONTAŻ I ZAŁADUNEK – Profesjonalny demontaż i załadunek pojazdów",
    "TRANSPORT – Organizacja transportu krajowego i międzynarodowego",
  ],
  en: [
    "TRUCKS – Purchase and sale of trucks and tractors",
    "CARS – Purchase and sale of cars and vans",
    "ENGINES & PARTS – Buying and selling engines and parts for all vehicles",
    "CONSTRUCTION MACHINERY – Industrial and agricultural machines",
    "BUSES – Purchase and sale of coaches and buses",
    "TRAILERS – Curtainsiders, refrigerators, tanks and more",
    "TIRES & RIMS – Sale of tires, rims and tubes",
    "DISMANTLING & LOADING – Professional dismantling and loading",
    "TRANSPORT – Domestic and international transport organization",
  ],
};

const titles = {
  pl: "Niezawodne rozwiązania\nw świecie ciężarówek",
  en: "Reliable Solution\nin the World of\nTrucks",
};

const buttons = { pl: "Dowiedz się więcej", en: "Learn More" };
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
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases[language].length);
    }, 3500);
    return () => clearInterval(interval);
  }, [language]);

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
              {titles[language]}
            </h1>

            <div className={styles.phraseBox}>
              <p className={`${styles.phrase} ${styles.fade}`} key={currentIndex}>
                {phrases[language][currentIndex]}
              </p>
              <button className={styles.cta} onClick={handleClick}>
                {buttons[language]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
