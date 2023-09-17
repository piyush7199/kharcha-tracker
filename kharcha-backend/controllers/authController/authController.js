import { collection, addDoc } from "firebase/firestore";

import { collectionNames } from "../../constants/appConstants.js";
import { db } from "../../firebase-db/firebase-connection.js";

export const signupUser = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body);
    const docRef = await addDoc(collection(db, collectionNames.USERS), data);
    console.log("User added ==> " + user);
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
