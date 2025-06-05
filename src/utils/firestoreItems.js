import { db } from '../firebase-config';
import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc
} from 'firebase/firestore';

const itemsCollection = collection(db, 'items');

export const addItem = async (item) => {
  const docRef = await addDoc(itemsCollection, item);
  await updateDoc(docRef, { id: docRef.id });
  return docRef.id;
};

export const updateItem = async (id, item) => {
  const docRef = doc(db, 'items', id);
  await setDoc(docRef, item);
};

export const deleteItem = async (id) => {
  const docRef = doc(db, 'items', id);
  await deleteDoc(docRef);
};

export const fetchItems = async () => {
  const querySnapshot = await getDocs(itemsCollection);
  const data = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  localStorage.setItem('items', JSON.stringify(data));
  return data;
};
