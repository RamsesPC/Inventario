import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Button, StyleSheet } from "react-native";
import LocalDB from "./persistance/localdb";

type ProductAddProps = {
  navigation: any;
};

const ProductAdd: React.FC<ProductAddProps> = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");

  const addProduct = async () => {
    try {
      const db = await LocalDB.connect();
      await db.transaction(async (tx) => {
        await tx.executeSql(
          "INSERT INTO productos (nombre, precio, miniStock, maxStock, currentStock) VALUES (?, ?, ?, ?, ?)",
          [nombre, parseFloat(precio), parseInt(minStock), parseInt(maxStock), parseInt(minStock)]
        );
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del producto"
      />
      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Precio"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Stock mínimo:</Text>
      <TextInput
        style={styles.input}
        value={minStock}
        onChangeText={setMinStock}
        placeholder="Stock mínimo"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Stock máximo:</Text>
      <TextInput
        style={styles.input}
        value={maxStock}
        onChangeText={setMaxStock}
        placeholder="Stock máximo"
        keyboardType="numeric"
      />
      <Button title="Agregar Producto" onPress={addProduct} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ProductAdd;