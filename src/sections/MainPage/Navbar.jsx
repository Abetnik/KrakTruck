import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import logoKraktruck1 from "../../assets/images/logoBlack.png";
import { useInView } from "../../hooks/useInView";
import { scrollToSection } from "../../hooks/scrollToSection";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ refs }) => {
  const [ref, isVisible] = useInView(0.1);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleLangMenu = () => setLangMenuOpen(!langMenuOpen);
  const changeLang = (lang) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleScroll = (key) => {
    if (refs && refs[key]) {
      scrollToSection(refs[key]);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false); // закрыть мобильное меню при возврате на десктоп
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav ref={ref} className={`${styles.navbar} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logoKraktruck1} alt="KrakTruck" className={styles.logo} />
          </Link>
        </div>

        {isMobile ? (
          <div className={styles.mobileControls}>
            <div className={styles.langWrapper}>
              <button onClick={toggleLangMenu} className={styles.langButton}>
                {language}
              </button>
              {langMenuOpen && (
                <div className={styles.langDropdown}>
                  <span onClick={() => changeLang("EN")}>English</span>
                  <span onClick={() => changeLang("PL")}>Polski</span>
                </div>
              )}
            </div>

            <div className={styles.mobileMenuIcon} onClick={() => setMenuOpen(!menuOpen)}>
              <GiHamburgerMenu color="#96C93D" size={28} />
            </div>
          </div>
        ) : (
          <ul className={styles.navLinks}>
            <li className={styles.linkItem} onClick={() => handleScroll("about")}>About us</li>
            <li className={styles.linkItem} onClick={() => handleScroll("service")}>Service</li>
            <li className={styles.linkItem}>
              <Link to="/purchase" className={styles.navLink}>Purchase</Link>
            </li>
            <li className={styles.linkItem}>
              <Link to="/sale" className={styles.navLink}>Sale</Link>
            </li>
            <li>
              <button className={styles.contactButton} onClick={() => handleScroll("contact")}>Contact</button>
            </li>
            <li className={styles.langWrapper}>
              <button onClick={toggleLangMenu} className={styles.langButton}>{language}</button>
              {langMenuOpen && (
                <div className={styles.langDropdown}>
                  <span onClick={() => changeLang("EN")}>English</span>
                  <span onClick={() => changeLang("PL")}>Polski</span>
                </div>
              )}
            </li>
          </ul>
        )}

        {isMobile && (
          <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
            <ul className={styles.mobileMenuList}>
              <li onClick={() => handleScroll("about")}>About us</li>
              <li onClick={() => handleScroll("service")}>Service</li>
              <li><Link to="/purchase" onClick={() => setMenuOpen(false)}>Purchase</Link></li>
              <li><Link to="/sale" onClick={() => setMenuOpen(false)}>Sale</Link></li>
              <li>
                <button onClick={() => handleScroll("contact")} className={styles.contactButton}>
                  Contact
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
