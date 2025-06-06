import React, { useEffect, useState } from "react";
import Navbar from "../sections/MainPage/Navbar";
import Footer from "../sections/MainPage/Footer";
import FilterPurchase from "../sections/PurchasePage/FilterPurchase";
import PurchaseItemArea from "../sections/PurchasePage/PurchaseItemArea";
import styles from "./SalePage.module.css"; // можно переименовать позже в shared style
import { fetchItems } from "../utils/firestoreItems";
import { useLanguage } from "../context/LanguageContext";

const getItemsPerPage = () => {
  if (window.innerWidth <= 768) return 6;
  return 9;
};

const PurchasePage = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    fetchItems().then((data) => {
      const filtered = data.filter((item) => item.type === "purchase");
      setItems(filtered);
    });

    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Фильтрация
  const filteredItems = items.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  // Пагинация
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.wrapper}>
        <section className={styles.container}>
          <h1 className={styles.heading}>
            {language === "pl" ? "Zapotrzebowania zakupowe" : "Purchase demands"}
          </h1>
        </section>

        <FilterPurchase selected={selectedCategory} onSelect={setSelectedCategory} />
        <PurchaseItemArea items={paginatedItems} />

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              &lt;
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={currentPage === idx + 1 ? styles.activePage : ""}
              >
                {idx + 1}
              </button>
            ))}

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default PurchasePage;
