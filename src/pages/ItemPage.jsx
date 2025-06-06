import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../sections/MainPage/Navbar";
import Footer from "../sections/MainPage/Footer";
import ItemHeader from "../sections/ItemPage/ItemHeader";

import ItemGallery from "../sections/ItemPage/ItemGallery";
import ItemContactForm from "../sections/ItemPage/ItemContactForm";
import ItemSuggestions from "../sections/ItemPage/ItemSuggestions";
import { fetchItems } from "../utils/firestoreItems";

const ItemPage = () => {
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems().then((data) => {
      const item = data.find((i) => i.id === id);
      setCurrentItem(item || null);
    });
  }, [id]);

  if (!currentItem) {
    return (
      <>
        <Navbar />
        <main style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem" }}>
          <h2>Item not found</h2>
          <p>This item may have been removed or does not exist.</p>
        </main>
        <Footer />
      </>
    );
  }

  const {
      titlePl,
      titleEn,
      title,
      mainImage,
      image,
      specs,
      descriptionPl,
      descriptionEn,
      description,
      type,
      category,
      images,
    } = currentItem;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "80rem", margin: "0 auto", padding: "6rem 1.5rem 2rem" }}>

      <ItemHeader
          titlePl={titlePl}
          titleEn={titleEn}
          title={title}
          mainImage={mainImage}
          specs={specs}
          descriptionPl={descriptionPl}
          descriptionEn={descriptionEn}
          description={description}
        />
        <ItemGallery images={images && images.length > 0 ? images : [mainImage || image]} />
        <ItemContactForm />
        <ItemSuggestions
          currentId={id}
          currentType={type}
          currentCategory={category}
        />
      </main>
      <Footer />
    </>
  );
};

export default ItemPage;
