import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../../Services/api";
import { TouchableOpacity } from "react-native-web";

const Produtos = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api
      .get("/produtos")
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
    <TouchableOpacity onPress={() => detalheProduto(item.id)}>
      <View>
        <Text>{item.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={Styles.container}>
      <Text>Produtos</Text>
      <FlatList
        data={produtos}
        renderItem={renderProduto}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={Styles.botao} onPress={logout}>
        <Text style={Styles.textoBotao}>Sair do App</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  botao: {
    width: "40%",
    height: 40,
    backgroundColor: "#38A69D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20, // Adicionando margem para separar o botão da lista de produtos
  },
  textoBotao: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Produtos;
