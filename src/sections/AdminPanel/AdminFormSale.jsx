import React, { useEffect, useState } from "react";
import styles from "./AdminForm.module.css";
import { deleteImageFromFirebase } from "../../utils/deleteImage";

const AdminFormSale = ({
  newItem,
  onChange,
  onSubmit,
  onAddSpec,
  specInput,
  setSpecInput,
  imagesData,
  setImagesData,
  mainImageFile,
  setMainImageFile,
  mainImage,
  setMainImage,
  setMainImagePath,
  loading
}) => {
  const [mainImagePreview, setMainImagePreview] = useState("");

  useEffect(() => {
    if (mainImageFile) {
      const previewUrl = URL.createObjectURL(mainImageFile);
      setMainImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else if (mainImage) {
      setMainImagePreview(mainImage); // с сервера
    } else {
      setMainImagePreview("");
    }
  }, [mainImageFile, mainImage]);

  const handleMainImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImage(""); // удалить превью с сервера
    }
  };

  const handleDeleteMainImage = async () => {
    if (mainImage && !mainImageFile && newItem.mainImagePath) {
      await deleteImageFromFirebase(newItem.mainImagePath);
      setMainImage("");
      setMainImagePath("");
    }
    setMainImageFile(null);
    setMainImagePreview("");
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImagesData((prev) => [...prev, ...previewImages]);
  };

  const handleDeleteGalleryImage = async (index) => {
    const image = imagesData[index];
    if (!image) return;

    const updated = [...imagesData];

    if (!image.file && image.path) {
      // Это серверное изображение
      await deleteImageFromFirebase(image.path);
    } else {
      // Очистка blob
      URL.revokeObjectURL(image.url);
    }

    updated.splice(index, 1);
    setImagesData(updated);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.sectionTitle}>
        {newItem.id ? "Edytuj ogłoszenie (Sprzedaż)" : "Dodaj nowe ogłoszenie"}
      </h3>

      <input
        name="titlePl"
        placeholder="Tytuł (PL)"
        value={newItem.titlePl}
        onChange={onChange}
        required
      />
      <input
        name="titleEn"
        placeholder="Title (EN)"
        value={newItem.titleEn}
        onChange={onChange}
      />
      <input
        name="year"
        placeholder="Rok produkcji"
        value={newItem.year}
        onChange={onChange}
        required
      />

      <label className={styles.label}>Zdjęcie główne:</label>
      <input type="file" accept="image/*" onChange={handleMainImageSelect} />
      {mainImagePreview && (
        <div className={styles.mainThumbWrapper}>
          <img src={mainImagePreview} alt="preview" className={styles.mainThumb} />
          <button type="button" onClick={handleDeleteMainImage}>Usuń</button>
        </div>
      )}

      <textarea
        name="descriptionPl"
        placeholder="Opis (PL)"
        value={newItem.descriptionPl}
        onChange={onChange}
      />
      <textarea
        name="descriptionEn"
        placeholder="Description (EN)"
        value={newItem.descriptionEn}
        onChange={onChange}
      />

      <select name="category" value={newItem.category} onChange={onChange}>
        <option value="trucks">Auta ciężarowe i ciągniki siodłowe</option>
        <option value="engines">Silniki i części</option>
        <option value="trailers">Naczepy i chłodnie</option>
        <option value="vans">Osobowe i dostawcze</option>
        <option value="construction">Maszyny budowlane i rolnicze</option>
        <option value="buses">Autobusy</option>
        <option value="tires">Opony i Felgi</option>
      </select>

      <select name="status" value={newItem.status} onChange={onChange}>
        <option value="available">DOSTĘPNY</option>
        <option value="sold">SPRZEDANY</option>
      </select>

      <div className={styles.specArea}>
        <h4>Specyfikacja</h4>
        {newItem.specs.map((s, i) => (
          <div key={i}>
            {s.key}: {s.value}
            <button
              type="button"
              onClick={() => {
                const updated = [...newItem.specs];
                updated.splice(i, 1);
                onChange({ target: { name: "specs", value: updated } });
              }}
            >
              Usuń
            </button>
          </div>
        ))}
        <div className={styles.specInput}>
          <input
            placeholder="Klucz"
            value={specInput.key}
            onChange={(e) => setSpecInput({ ...specInput, key: e.target.value })}
          />
          <input
            placeholder="Wartość"
            value={specInput.value}
            onChange={(e) => setSpecInput({ ...specInput, value: e.target.value })}
          />
          <button onClick={onAddSpec}>Dodaj</button>
        </div>
      </div>

      <label className={styles.label}>Galeria zdjęć:</label>
      <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
      <div className={styles.imagePreview}>
        {imagesData.map((img, i) => (
          <div key={i} className={styles.thumbWrapper}>
            <img src={img.url} alt={`img-${i}`} className={styles.thumb} />
            <button type="button" onClick={() => handleDeleteGalleryImage(i)}>Usuń</button>
          </div>
        ))}
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Zapisywanie..." : newItem.id ? "Zapisz zmiany" : "Dodaj"}
      </button>
    </form>
  );
};

export default AdminFormSale;
