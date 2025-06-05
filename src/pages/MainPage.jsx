import React, { useRef } from "react";

// ✅ Импорт секций
import HeroSection from "../sections/MainPage/HeroSection";
import Navbar from "../sections/MainPage/Navbar";
import AboutUsSection from "../sections/MainPage/AboutUsSection";
import OurServiceSection from "../sections/MainPage/OurServiceSection";
import OurActivitySection from "../sections/MainPage/OurActivitySection";
import PurchaseSaleSection from "../sections/MainPage/PurchaseSaleSection";
import ContactSection from "../sections/MainPage/ContactSection";
import Footer from "../sections/MainPage/Footer";

// ✅ ГЛАВНЫЙ КОМПОНЕНТ
const MainPage = () => {
  // 🎯 Создаём ref для нужных секций
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const contactRef = useRef(null);

  // 📦 Собираем их в объект, который передаём в Navbar
  const sectionRefs = {
    about: aboutRef,
    service: serviceRef,
    contact: contactRef,
  };

  return (
    <>
      {/* ✅ Передаём refs в Navbar */}
      <Navbar refs={sectionRefs} />

      {/* ✅ Передаём отдельный ref в HeroSection — он будет вызывать прокрутку к about */}
      <HeroSection scrollTarget={aboutRef} />

      {/* ✅ Оборачиваем целевые секции в <section ref={...}> */}
      <section ref={aboutRef}>
        <AboutUsSection />
      </section>

      <section ref={serviceRef}>
        <OurServiceSection />
      </section>

      {/* Не нужны refs, отображаем как есть */}
      <OurActivitySection />
      <PurchaseSaleSection />

      <section ref={contactRef}>
        <ContactSection />
      </section>

      <Footer />
    </>
  );
};

export default MainPage;
