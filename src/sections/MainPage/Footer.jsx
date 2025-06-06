import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/images/logo.png";
import { useLanguage } from "../../context/LanguageContext";

const texts = {
  pl: "Wszelkie prawa zastrzeżone.",
  en: "All rights reserved.",
};

const Footer = () => {
  const { language } = useLanguage();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={logo} alt="KrakTruck Logo" className={styles.logo} />
        <p className={styles.text}>
          Copyright (c) 2023&nbsp;
          <a href="https://kraktruck.pl" className={styles.link}>kraktruck.pl</a>. {texts[language]}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
