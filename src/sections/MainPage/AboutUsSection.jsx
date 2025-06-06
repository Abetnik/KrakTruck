import React, { useEffect, useState } from "react";
import styles from "./AboutUsSection.module.css";
import { useInView } from "../../hooks/useInView";
import { useLanguage } from "../../context/LanguageContext";

const AnimatedNumber = ({ target, duration = 1000 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = 20;
    const increment = target / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <h3>{value}+</h3>;
};

const texts = {
  pl: {
    title: "O nas",
    desc:
      "Jesteśmy międzynarodową firmą motoryzacyjną. Eksportujemy, importujemy, kupujemy i sprzedajemy nowe i używane silniki, ciężarówki, pojazdy dostawcze, ciągniki, wywrotki, samochody osobowe, autobusy, naczepy, chłodnie, maszyny budowlane i rolnicze oraz ich części.",
    years: "lat\ndoświadczenia",
    clients: "zadowolonych klientów",
    countries: "obsługiwanych\nkrajów",
  },
  en: {
    title: "About Us",
    desc:
      "We are an international automotive company, exporting, importing, purchasing and selling new and used engines, trucks, delivery trucks, truck heads, tippers, passenger cars, buses, semitrailers, refrigerated trucks, building machines, industrial and agricultural machines and their parts.",
    years: "Years of\nexperience",
    clients: "satisfied clients",
    countries: "countries\nserved",
  },
};

const AboutUsSection = () => {
  const { language } = useLanguage();
  const [ref, isVisible] = useInView(0.2);

  return (
    <section ref={ref} className={`${styles.aboutUs} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.container}>
        <div className={styles.aboutRow}>
          <div className={styles.aboutText}>
            <h2>{texts[language].title}</h2>
            <p>{texts[language].desc}</p>
          </div>
          <div className={styles.stats}>
            <div>
              {isVisible && <AnimatedNumber target={15} />}
              <p>{texts[language].years}</p>
            </div>
            <div>
              {isVisible && <AnimatedNumber target={1000} />}
              <p>{texts[language].clients}</p>
            </div>
            <div>
              {isVisible && <AnimatedNumber target={30} />}
              <p>{texts[language].countries}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
