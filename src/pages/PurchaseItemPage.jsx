import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../sections/MainPage/Navbar";
import Footer from "../sections/MainPage/Footer";
import PurchaseItemHeader from "../sections/PurchaseItemPage/PurchaseItemHeader";
import ItemContactForm from "../sections/ItemPage/ItemContactForm";
import PurchaseItemSuggestions from "../sections/PurchaseItemPage/PurchaseItemSuggestions";
import { fetchItems } from "../utils/firestoreItems";

const PurchaseItemPage = () => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems().then((data) => {
      const item = data.find((i) => i.id === id && i.type === "purchase");
      setCurrentItem(item || null);
    });
  }, [id]);

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
