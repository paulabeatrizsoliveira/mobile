import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import api from "../../Services/api";
import { AuthContext } from '../../context/AuthContext';

const Produtos = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/produto")
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((e) => {
        console.log("Erro ao buscar Produto", e);
      });
  }, []);

  const detalheProduto = (produtoId) => {
    navigation.navigate("DetalheProduto", { id: produtoId });
  };

  const renderProduto = ({ item }) => (
    <TouchableOpacity onPress={() => detalheProduto(item.id)} style={styles.item}>
      <Text style={styles.itemText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <Text style={styles.titulo}>Produtos</Text>
        <FlatList
          data={produtos}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Sair do App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#38A69D',
  },
  flatListContainer: {
    flex: 0.95,
    maxWidth: '95%',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: 'center',
  },
  list: {
    width: "100%",
  },
  item: {
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  button: {
    width: "40%",
    height: 40,
    backgroundColor: "#38A69D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Produtos;
