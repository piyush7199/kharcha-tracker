// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { firebaseConfig } from "./firebase-config.js";

// export const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
