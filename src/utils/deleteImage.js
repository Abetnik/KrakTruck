import { storage } from "../firebase-config";
import { ref, deleteObject } from "firebase/storage";

/**
 * Удаляет изображение из Firebase Storage по пути
 * @param {string} path - относительный путь к файлу в Firebase (например uploads/image.jpg)
 */
export const deleteImageFromFirebase = async (path) => {
  const fileRef = ref(storage, path);

  try {
    await deleteObject(fileRef);
    console.log(`✅ Usunięto obrazek z Firebase: ${path}`);
  } catch (err) {
    console.error(`❌ Błąd przy usuwaniu ${path}:`, err);
  }
};
