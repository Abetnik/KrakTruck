import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../sections/MainPage/Navbar";
import Footer from "../sections/MainPage/Footer";
import PurchaseItemHeader from "../sections/PurchaseItemPage/PurchaseItemHeader";
import ItemContactForm from "../sections/ItemPage/ItemContactForm";
import PurchaseItemSuggestions from "../sections/PurchaseItemPage/PurchaseItemSuggestions";

const PurchaseItemPage = () => {
  const { id } = useParams();
  const allItems = JSON.parse(localStorage.getItem("items") || "[]");

  const currentItem = allItems.find((item) => item.id === id && item.type === "purchase");

  if (!currentItem) {
    return (
      <>
        <Navbar />
        <main style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem" }}>
          <h2>Nie znaleziono ogłoszenia</h2>
          <p>To ogłoszenie mogło zostać usunięte lub nie istnieje.</p>
        </main>
        <Footer />
      </>
    );
  }

  const { title, mainImage, specs, description, type, category } = currentItem;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "80rem", margin: "0 auto", padding: "6rem 1.5rem 2rem" }}>
        <PurchaseItemHeader
          title={title}
          mainImage={mainImage}
          specs={specs}
          description={description}
        />

        <ItemContactForm />

        <PurchaseItemSuggestions
          currentId={id}
          currentType={type}
          currentCategory={category}
        />
      </main>
      <Footer />
    </>
  );
};

export default PurchaseItemPage;
