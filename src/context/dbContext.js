import React, { useContext, useEffect, useState } from "react";
import { db, auth } from "../firebase";

const DbContext = React.createContext();

export const useDb = () => {
  return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
  const [weights, setWeights] = useState(null);

  const deleteEntry = async (docId) => {
    await db.collection("weights").doc(docId).delete();
  };

  const addEntry = async (weight) => {
    await db.collection("weights").add({
      userId: auth.currentUser.uid,
      weight,
      date: Date.now()
    });
  };

  const editEntry = async (weight, docId) => {
    await db.collection("weights").doc(docId).update({
      weight,
      date: Date.now()
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("weights").where("userId", "==", auth.currentUser && auth.currentUser.uid ).orderBy('date', "desc").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => {
        let weightData = doc.data();
        weightData["id"] = doc.id;
        return weightData;
      });
      setWeights(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    weights,
    deleteEntry,
    addEntry,
    editEntry
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
