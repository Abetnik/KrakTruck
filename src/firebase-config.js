// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Конфигурация из консоли Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBg8lzVHnTGPnUTkgkcINKmuNxPwq271Fk",
  authDomain: "kraktrucktest.firebaseapp.com",
  projectId: "kraktrucktest",
  storageBucket: "kraktrucktest.appspot.com", // ✅ ВАЖНО!
  messagingSenderId: "399614480500",
  appId: "1:399614480500:web:6ff165e38b7bfc0e4bc121",
  measurementId: "G-CF92DC0ZVY"
};

// 🔧 Инициализация
const app = initializeApp(firebaseConfig);

// 📦 Хранилище и 🔐 Авторизация
export const storage = getStorage(app, "gs://kraktrucktest.firebasestorage.app");

export const auth = getAuth(app);
export const db = getFirestore(app);
