import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles, mainTheme } from "../styles";
import { Form } from "../contexts/form";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemList = () => {
  const { state, setState } = useContext(Form);

  const confirmDelete = (id) => {
    Alert.alert(
      "Excluir item",
      "Tem certeza de que deseja excluir este item?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => onDelete(id),
          style: "destructive",
        },
      ]
    );
  };

  const calculateAverage = () => {
    const accumulator = state.saved.reduce((acc, item) => {
      return acc + Number(item.average);
    }, 0);
    const result = accumulator / state.saved.length;
    return result.toFixed(2);
  };

  function onEdit(item, editingIndex) {
    setState((prev) => {
      AsyncStorage.setItem("saved", JSON.stringify(prev.saved || [])).catch(
        console.error
      );
      return {
        ...prev,
        grades: item.grades,
        course: item.course,
        editingIndex,
      };
    });
  }

  function onDelete(id) {
    setState((prev) => {
      const savedAtt = prev.saved.filter((item, index) => index !== id);
      AsyncStorage.setItem("saved", JSON.stringify(savedAtt || [])).catch(
        console.error
      );

      return {
        ...prev,
        saved: savedAtt,
      };
    });
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.course} - {item.average.toFixed(2)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => onEdit(item, index)}
        >
          <MaterialIcons
            name="edit"
            size={24}
            color={mainTheme.buttonSecondaryColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.action}
          onPress={() => confirmDelete(index)}
        >
          <MaterialIcons
            name="close"
            size={24}
            color={mainTheme.buttonDangerColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={state.saved}
        scrollEnabled={false}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
      />

      <View style={styles.separator} />
      <View style={styles.item}>
        <Text style={styles.itemText}>Média Geral: {calculateAverage()}</Text>
      </View>
    </View>
  );
};

export default ItemList;
