import { storage } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const uploadImageToFirebase = async (file) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("Пользownik nie jest zalogowany");

  const token = await user.getIdToken();
  const filePath = `uploads/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, filePath);

  const metadata = {
    contentType: file.type,
    customMetadata: {
      Authorization: `Bearer ${token}` // 👈 остаётся как у тебя
    }
  };

  const snapshot = await uploadBytes(fileRef, file, metadata);
  const url = await getDownloadURL(snapshot.ref);

  return {
    url,
    path: filePath // 👈 путь нужен для последующего удаления
  };
};
