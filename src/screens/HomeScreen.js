import React from "react";
import { View } from "react-native";
import InputForm from "../components/InputForm";
import ItemList from "../components/ItemList";
import { styles } from "../styles";
import { ScrollView } from "react-native-gesture-handler";
import { FormProvider } from "../contexts/form";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <FormProvider>
        <InputForm />
        <View style={styles.separator} />
        <ItemList />
      </FormProvider>
    </ScrollView>
  );
};

export default HomeScreen;
