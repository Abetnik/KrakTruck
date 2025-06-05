import React, { useEffect, useState } from "react";
import styles from "./AboutUsSection.module.css";
import { useInView } from "../../hooks/useInView";

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

const AboutUsSection = () => {
  const [ref, isVisible] = useInView(0.2);

  return (
    <section ref={ref} className={`${styles.aboutUs} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.container}>
        <div className={styles.aboutRow}>
          <div className={styles.aboutText}>
            <h2>About Us</h2>
            <p>
              We are an international automotive company, we export, import, purchase and sell new and used engines, trucks, delivery trucks, trucks heads, tippers, passenger cars, buses, semitrailers, refrigerated trucks, building machines, industrial and agricultural machines and their parts.
            </p>
          </div>
          <div className={styles.stats}>
            <div>
              {isVisible && <AnimatedNumber target={15} />}
              <p>Years of<br />experience</p>
            </div>
            <div>
              {isVisible && <AnimatedNumber target={1000} />}
              <p>satisfied clients</p>
            </div>
            <div>
              {isVisible && <AnimatedNumber target={30} />}
              <p>countries<br />served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
