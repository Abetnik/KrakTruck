import React from "react";
import styles from "./ContactSection.module.css";
import background from "../../assets/images/MainPage/ContactBackImage.png";
import { useInView } from "../../hooks/useInView";
import { useLanguage } from "../../context/LanguageContext";

import CallIcon from "../../assets/icons/CallIcon.svg";
import OfficeCallIcon from "../../assets/icons/OffieCallIcon.svg";
import MailIcon from "../../assets/icons/MailIcon.svg";

import FacebookIcon from "../../assets/images/MainPage/socialmeia/FacebookIcon.png";
import InstagramIcon from "../../assets/images/MainPage/socialmeia/InstagramIcon.png";
import MessengerIcon from "../../assets/images/MainPage/socialmeia/MassengerIcon.png";

const texts = {
  pl: {
    heading: "Skontaktuj się, aby uzyskać informacje",
    name: "Imię",
    email: "Email",
    msg: "Wiadomość",
    send: "Wyślij",
  },
  en: {
    heading: "Contact to verify",
    name: "Name",
    email: "Email",
    msg: "Message",
    send: "Send",
  },
};

const ContactSection = () => {
  const { language } = useLanguage();
  const [ref, isVisible] = useInView(0.25);

  return (
    <section
      ref={ref}
      className={`${styles.section} ${isVisible ? styles.visible : ""}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div>
              <h2 className={styles.heading}>{texts[language].heading}</h2>
              <ul className={styles.infoList}>
                <li>
                  <img src={CallIcon} alt="Phone" className={styles.icon} />
                  <a href="tel:+48507711500" className={styles.link}>+48 507 711 500 (Mobile)</a>
                </li>
                <li>
                  <img src={OfficeCallIcon} alt="Office" className={styles.icon} />
                  <a href="tel:+48570746175" className={styles.link}>+48 570 746 175 (Office)</a>
                </li>
                <li>
                  <img src={MailIcon} alt="Email" className={styles.icon} />
                  <a href="mailto:kraktruck@gmail.com" className={styles.link}>kraktruck@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className={styles.socials}>
  <a
    href="https://www.facebook.com/kraktruck.poland?mibextid=wwXIfr&rdid=jiQwBhe8kr7Pj2sk&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16bfPPihGX%2F%3Fmibextid%3DwwXIfr#"
    className={styles.socialIcon}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={FacebookIcon} alt="Facebook" />
  </a>
  <a
    href="https://www.instagram.com/kraktruck?igsh=aWYzb2wwZXJ2d2c1&utm_source=qr"
    className={styles.socialIcon}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={InstagramIcon} alt="Instagram" />
  </a>
  <a
    href="https://wa.me/48507711500"
    className={styles.socialIcon}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={MessengerIcon} alt="WhatsApp" />
  </a>
</div>
          </div>

          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Sending form...");
            }}
          >
            <input type="text" placeholder={texts[language].name} className={styles.input} required />
            <input type="email" placeholder={texts[language].email} className={styles.input} required />
            <textarea placeholder={texts[language].msg} className={styles.textarea} required></textarea>
            <button type="submit" className={styles.button}>{texts[language].send}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
