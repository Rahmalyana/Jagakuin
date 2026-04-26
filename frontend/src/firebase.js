import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlZ6KP4BZUuv2aBLOwwGOIiUmJy6ePgn0",
  authDomain: "chat-jagakuin.firebaseapp.com",
  projectId: "chat-jagakuin"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);