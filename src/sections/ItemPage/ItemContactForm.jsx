import React, { useState } from "react";
import styles from "./ItemContactForm.module.css";
import { useLanguage } from "../../context/LanguageContext";

import CallIcon from "../../assets/icons/CallIcon.svg";
import OfficeCallIcon from "../../assets/icons/OffieCallIcon.svg";
import MailIcon from "../../assets/icons/MailIcon.svg";
import FacebookIcon from "../../assets/images/MainPage/socialmeia/FacebookIcon.png";
import InstagramIcon from "../../assets/images/MainPage/socialmeia/InstagramIcon.png";
import MessengerIcon from "../../assets/images/MainPage/socialmeia/MassengerIcon.png";

const texts = {
  pl: { heading: "Kontakt w sprawie oferty", name: "Imię", email: "Email", msg: "Wiadomość", send: "Wyślij", success: "Wiadomość wysłana!" },
  en: { heading: "Contact to verify", name: "Your Name", email: "Your Email", msg: "Your Message", send: "Send", success: "Message sent successfully!" },
};

const ItemContactForm = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Левая колонка — контакты */}
          <div className={styles.left}>
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

            <div className={styles.socials}>
              <a href="https://www.facebook.com/kraktruck.poland" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <img src={FacebookIcon} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/kraktruck" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <img src={InstagramIcon} alt="Instagram" />
              </a>
              <a href="https://wa.me/48507711500" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <img src={MessengerIcon} alt="WhatsApp" />
              </a>
            </div>
          </div>

          {/* Правая колонка — форма */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder={texts[language].name}
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder={texts[language].email}
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <textarea
              name="message"
              placeholder={texts[language].msg}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
            <button type="submit" className={styles.button}>{texts[language].send}</button>
            {sent && <p className={styles.success}>{texts[language].success}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ItemContactForm;
