// App.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SalePage from "./pages/SalePage";
import ItemPage from "./pages/ItemPage";
import AdminPanel from "./pages/AdminPanel";
import PurchasePage from "./pages/PurchasePage";
import PurchaseItemPage from "./pages/PurchaseItemPage";

// 👉 подключаем анонимную авторизацию
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  // 🔒 Выполняем при загрузке
  useEffect(() => {
    signInAnonymously(auth)
      .then(() => console.log("✅ Anonymous auth success"))
      .catch((err) => console.error("❌ Auth failed:", err));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sale" element={<SalePage />} />
      <Route path="/sale/:id" element={<ItemPage />} />
      <Route path="/purchase" element={<PurchasePage />} />
      <Route path="/purchase/:id" element={<PurchaseItemPage />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
