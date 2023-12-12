import React, { useContext } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { styles, mainTheme } from "../styles";
import { Form } from "../contexts/form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const InputForm = () => {
  const { state, setState } = useContext(Form);

  const handleSave = () => {
    const isEditing = state.editingIndex != null;

    let accumulator = 0;
    let weight = 0;

    for (const item of state.grades) {
      accumulator += Number(item.value) * item.weight;
      weight += Number(item.weight);
    }

    const average = accumulator / weight;
    const obj = {
      course: state.course,
      grades: state.grades,
      average,
    };

    setState((prev) => {
      const saved = [...prev.saved];

      if (isEditing) {
        saved[state.editingIndex] = obj;
      } else {
        saved.push(obj);
      }

      AsyncStorage.setItem("saved", JSON.stringify(saved || [])).catch(
        console.error
      );

      return { ...prev, saved, course: "", grades: [], editingIndex: null };
    });
  };

  function addGrade() {
    setState((state) => ({
      ...state,
      grades: [...state.grades, { value: "", weight: "" }],
    }));
  }

  function removeGrade() {
    setState((state) => ({
      ...state,
      grades: state.grades.slice(0, state.grades.length - 1),
    }));
  }

  function changeGrade(index, key) {
    return (value) => {
      setState((state) => {
        const grades = [...state.grades];
        grades[index][key] = value;
        return { ...state, grades };
      });
    };
  }

  function changeCourse(value) {
    setState((state) => ({ ...state, course: value }));
  }

  function onCancelEdit() {
    setState((state) => ({
      ...state,
      grades: [],
      course: "",
      editingIndex: null,
    }));
  }

  const isValidForm =
    state.course.length > 0 &&
    state.grades.every((grade) => grade.value > 0 && grade.weight > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Matéria Escolar</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: português"
        value={state.course}
        onChangeText={(value) => changeCourse(value)}
        placeholderTextColor={mainTheme.placeholderColor}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={{ padding: 10, backgroundColor: "#111", borderRadius: 4 }}
          onPress={removeGrade}
        >
          <MaterialIcons
            name="remove"
            size={24}
            color={mainTheme.buttonDangerColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            marginLeft: 10,
            backgroundColor: "#111",
            borderRadius: 4,
          }}
          onPress={addGrade}
        >
          <MaterialIcons
            name="add"
            size={24}
            color={mainTheme.buttonPrimaryColor}
          />
        </TouchableOpacity>
      </View>
      {state.grades.map(({ value, weight }, index) => (
        <View style={styles.row} key={index}>
          <View>
            <Text style={styles.label}>Nota</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: 1"
              value={value}
              keyboardType="numeric"
              onChangeText={changeGrade(index, "value")}
              placeholderTextColor={mainTheme.borderColor}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.label}>Peso</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: 1"
              value={weight}
              keyboardType="numeric"
              onChangeText={changeGrade(index, "weight")}
              placeholderTextColor={mainTheme.borderColor}
            />
          </View>
        </View>
      ))}
      {state.editingIndex !== null ? (
        <>
          <TouchableOpacity
            onPress={handleSave}
            disabled={!isValidForm}
            color={mainTheme.buttonSecondaryColor}
            style={[styles.button, styles.btnEdit]}
          >
            <Text style={styles.itemText}>Editar</Text>
          </TouchableOpacity>
          <Text
            style={[styles.itemText, { alignSelf: "center", marginTop: 20 }]}
            onPress={onCancelEdit}
          >
            Cancelar
          </Text>
        </>
      ) : (
        <TouchableOpacity
          onPress={handleSave}
          disabled={!isValidForm}
          color={mainTheme.buttonPrimaryColor}
          style={styles.button}
        >
          <Text style={styles.itemText}>Salvar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputForm;
