import React, { useState, useEffect } from "react";
import AdminTypeSelector from "../sections/AdminPanel/AdminTypeSelector";
import AdminFormSale from "../sections/AdminPanel/AdminFormSale";
import AdminFormPurchase from "../sections/AdminPanel/AdminFormPurchase";
import AdminItemList from "../sections/AdminPanel/AdminItemList";
import styles from "./AdminPanel.module.css";
import { uploadImageToFirebase } from "../utils/uploadImage";
import { deleteImageFromFirebase } from "../utils/deleteImage";
import {
  addItem as addItemToDb,
  updateItem as updateItemInDb,
  deleteItem as deleteItemFromDb,
  fetchItems,
} from "../utils/firestoreItems";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLogged") === "true"
  );
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [selectedTab, setSelectedTab] = useState("sale");

  const [newItem, setNewItem] = useState({
    id: null,
    title: "",
    category: "trucks",
    type: "sale",
    year: "",
    status: "available",
    description: "",
    specs: [],
    images: [],
    mainImage: "",
    mainImagePath: "",
  });

  const [specInput, setSpecInput] = useState({ key: "", value: "" });
  const [imagesData, setImagesData] = useState([]); // [{url, file?, path?}]
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [mainImagePath, setMainImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);
  const filteredItems = items.filter((item) => item.type === selectedTab);

  useEffect(() => {
    fetchItems().then(setItems);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "1234") {
      localStorage.setItem("adminLogged", "true");
      setIsLoggedIn(true);
    } else {
      alert("Nieprawidłowe dane logowania");
    }
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddSpec = (e) => {
    e.preventDefault();
    if (specInput.key && specInput.value) {
      setNewItem({
        ...newItem,
        specs: [...newItem.specs, { key: specInput.key, value: specInput.value }],
      });
      setSpecInput({ key: "", value: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedMain = null;
    if (mainImageFile) {
      uploadedMain = await uploadImageToFirebase(mainImageFile);
    }

    const updatedMainImage = uploadedMain
      ? uploadedMain.url
      : newItem.mainImage || "";
    const updatedMainPath = uploadedMain
      ? uploadedMain.path
      : newItem.mainImagePath || "";

    let uploadedGallery = [];

    if (selectedTab === "sale") {
      const alreadyUploaded = imagesData.filter((img) => !img.file);
      const newUploads = imagesData.filter((img) => img.file);

      const uploaded = await Promise.all(
        newUploads.map((img) => uploadImageToFirebase(img.file))
      );

      uploadedGallery = [
        ...alreadyUploaded.map((img) => ({
          url: img.url,
          path: img.path,
        })),
        ...uploaded,
      ];
    }

    const fullItem = {
      ...newItem,
      type: selectedTab,
      mainImage: updatedMainImage,
      mainImagePath: updatedMainPath,
      images: selectedTab === "sale" ? uploadedGallery : [],
    };

    try {
      if (newItem.id) {
        await updateItemInDb(newItem.id, fullItem);
      } else {
        const id = await addItemToDb(fullItem);
        fullItem.id = id;
      }

      const refreshed = await fetchItems();
      setItems(refreshed);
      alert("Pozycja została zapisana!");
      resetForm();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setSelectedTab(item.type);
    setNewItem(item);
    setMainImage(item.mainImage || "");
    setMainImagePath(item.mainImagePath || "");
    setMainImageFile(null);
    setImagesData(item.images || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const itemToDelete = items.find((item) => item.id === id);
    if (!itemToDelete) return;

    if (itemToDelete.mainImagePath) {
      await deleteImageFromFirebase(itemToDelete.mainImagePath);
    }

    if (Array.isArray(itemToDelete.images)) {
      for (const img of itemToDelete.images) {
        if (img.path) {
          await deleteImageFromFirebase(img.path);
        }
      }
    }

    await deleteItemFromDb(id);
    const refreshed = await fetchItems();
    setItems(refreshed);
    resetForm();
  };

  const resetForm = () => {
    setNewItem({
      id: null,
      title: "",
      category: "trucks",
      type: selectedTab,
      year: "",
      status: selectedTab === "sale" ? "available" : "poszukiwane",
      description: "",
      specs: [],
      images: [],
      mainImage: "",
      mainImagePath: "",
    });
    setImagesData([]);
    setMainImage("");
    setMainImagePath("");
    setMainImageFile(null);
    setSpecInput({ key: "", value: "" });
  };

  return (
    <div className={styles.wrapper}>
      {!isLoggedIn ? (
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Logowanie administratora</h2>
          <input
            type="text"
            name="username"
            placeholder="Nazwa użytkownika"
            value={loginData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Hasło"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Zaloguj się</button>
        </form>
      ) : (
        <>
          <AdminTypeSelector
            selectedTab={selectedTab}
            onSelectTab={(type) => {
              setSelectedTab(type);
              resetForm();
            }}
          />

          {loading && <div className={styles.loader}>Trwa wysyłanie danych...</div>}

          {selectedTab === "sale" ? (
            <AdminFormSale
              newItem={newItem}
              onChange={handleItemChange}
              onSubmit={handleSubmit}
              imagesData={imagesData}
              setImagesData={setImagesData}
              specInput={specInput}
              setSpecInput={setSpecInput}
              onAddSpec={handleAddSpec}
              mainImageFile={mainImageFile}
              setMainImageFile={setMainImageFile}
              mainImage={mainImage}
              setMainImage={setMainImage}
              setMainImagePath={setMainImagePath}
              loading={loading}
            />
          ) : (
            <AdminFormPurchase
              newItem={newItem}
              onChange={handleItemChange}
              onSubmit={handleSubmit}
              specInput={specInput}
              setSpecInput={setSpecInput}
              onAddSpec={handleAddSpec}
              mainImageFile={mainImageFile}
              setMainImageFile={setMainImageFile}
              mainImage={mainImage}
              setMainImage={setMainImage}
              setMainImagePath={setMainImagePath}
              loading={loading}
            />
          )}

          <AdminItemList
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <div className={styles.logoutWrapper}>
            <button
              className={styles.logoutButton}
              onClick={() => {
                localStorage.removeItem("adminLogged");
                window.location.reload();
              }}
            >
              Wyloguj się
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
