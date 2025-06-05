import React, { useState, useEffect } from "react";
import Navbar from "../sections/MainPage/Navbar";
import Footer from "../sections/MainPage/Footer";
import FilterSale from "../sections/SalePage/FilterSale";
import ItemArea from "../sections/SalePage/ItemArea";
import styles from "./SalePage.module.css";
import { fetchItems } from "../utils/firestoreItems";



const SalePage = () => {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const getItemsPerPage = () => {
  if (window.innerWidth <= 768) return 6;
  return 9;
};

const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

useEffect(() => {
  const handleResize = () => {
    setItemsPerPage(getItemsPerPage());
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  useEffect(() => {
    fetchItems().then((data) => {
      const saleItems = data.filter((item) => item.type === "sale");
      setItems(saleItems);
      setFiltered(saleItems);
    });
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFiltered(items);
    } else {
      const filteredData = items.filter((item) => item.category === activeCategory);
      setFiltered(filteredData);
    }
    setCurrentPage(1);
  }, [activeCategory, items]);

  // пагинация расчёты
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

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
          <h1 className={styles.heading}>Nasze ogłoszenia</h1>
        </section>

        <FilterSale active={activeCategory} setActive={setActiveCategory} />

        <ItemArea items={currentItems} />

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

export default SalePage;
