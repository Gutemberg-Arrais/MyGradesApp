import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

/**
 *
 * course
 * grades {value: number, weight: number}
 * editingIndex index
 * saved [{course: string, grades: [{value: number, weight: number}], average: number}]
 */

export const Form = createContext({
  course: "",
  grades: [],
  editingIndex: null,
  saved: [],
});

export const FormProvider = ({ children }) => {
  const [state, setState] = useState({
    course: "",
    grades: [],
    editingIndex: null,
    saved: [],
  });

  useEffect(() => {
    async function loadData() {
      try {
        const saved = await AsyncStorage.getItem("saved");
        if (saved) {
          setState((prev) => ({ ...prev, saved: JSON.parse(saved) }));
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }
    loadData();
  }, []);

  return <Form.Provider value={{ state, setState }}>{children}</Form.Provider>;
};
