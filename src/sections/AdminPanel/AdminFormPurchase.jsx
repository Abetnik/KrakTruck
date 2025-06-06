import React, { useState, useEffect } from "react";
import styles from "./AdminForm.module.css";
import { deleteImageFromFirebase } from "../../utils/deleteImage";

const AdminFormPurchase = ({
  newItem,
  onChange,
  onSubmit,
  onAddSpec,
  specInput,
  setSpecInput,
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
      setMainImagePreview(mainImage); // прямой URL с сервера
    } else {
      setMainImagePreview("");
    }
  }, [mainImageFile, mainImage]);

  const handleMainImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      setMainImage(""); // убираем серверное изображение
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

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.sectionTitle}>
        {newItem.id ? "Edytuj ogłoszenie (Zakup)" : "Dodaj nowe zapotrzebowanie"}
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
        <option value="poszukiwane">POSZUKIWANE</option>
        <option value="znalezione">ZNALEZIONE</option>
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

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Zapisywanie..." : newItem.id ? "Zapisz zmiany" : "Dodaj"}
      </button>
    </form>
  );
};

export default AdminFormPurchase;
