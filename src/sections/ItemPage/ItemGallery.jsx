import React, { useState, useEffect } from "react";
import styles from "./ItemGallery.module.css";

const ItemGallery = ({ images }) => {
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // ✅ для анимации
  const getMaxVisible = () => (window.innerWidth <= 768 ? 3 : 5);
  const [maxVisible, setMaxVisible] = useState(getMaxVisible());

  useEffect(() => {
    const handleResize = () => {
      setMaxVisible(getMaxVisible());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (index) => {
    setSelected(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // ✅ плавная анимация при переключении
  const animateThen = (setter) => {
    setIsAnimating(true);
    setTimeout(() => {
      setter();
      setIsAnimating(false);
    }, 150);
  };

  const prevModal = () => {
    animateThen(() =>
      setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    );
  };

  const nextModal = () => {
    animateThen(() =>
      setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    );
  };

  const getSrc = (img) => (typeof img === "string" ? img : img.url);
  const isMobile = window.innerWidth <= 768;

  // ✅ свайп
  useEffect(() => {
    if (!modalOpen) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].screenX;
      if (startX - endX > 50) {
        nextModal();
      } else if (endX - startX > 50) {
        prevModal();
      }
    };

    const modal = document.getElementById("modal-img-area");
    if (modal) {
      modal.addEventListener("touchstart", handleTouchStart);
      modal.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (modal) {
        modal.removeEventListener("touchstart", handleTouchStart);
        modal.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [modalOpen]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.galleryRow}>
          {!isMobile && (
            <button
              className={`${styles.navBtn} ${styles.left}`}
              onClick={() => setStartIndex(startIndex - 1)}
              disabled={startIndex === 0}
            >
              ‹
            </button>
          )}

          <div className={isMobile ? styles.scrollContainer : ""}>
            {(isMobile
              ? images
              : images.slice(startIndex, startIndex + maxVisible)
            ).map((img, i) => {
              const index = isMobile ? i : startIndex + i;
              return (
                <img
                  key={index}
                  src={getSrc(img)}
                  alt={`img-${index}`}
                  className={styles.thumb}
                  onClick={() => openModal(index)}
                />
              );
            })}
          </div>

          {!isMobile && (
            <button
              className={`${styles.navBtn} ${styles.right}`}
              onClick={() => setStartIndex(startIndex + 1)}
              disabled={startIndex + maxVisible >= images.length}
            >
              ›
            </button>
          )}
        </div>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            id="modal-img-area"
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            <img
              src={getSrc(images[selected])}
              alt={`modal-${selected}`}
              className={isAnimating ? styles.modalImageAnimated : ""}
            />

            {images.length > 1 && (
              <>
                <button className={styles.modalArrowLeft} onClick={prevModal}>
                  ‹
                </button>
                <button className={styles.modalArrowRight} onClick={nextModal}>
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemGallery;
