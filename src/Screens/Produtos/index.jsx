import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import api from "../../Services/api";
import { TouchableOpacity } from "react-native-web";

const ListaProdutos = ({ navigation }) => {
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

  const renderProductsItem = ({ item }) => (
    <TouchableOpacity onPress={() => detalheProduto(item.id)}>
      <View>
        <Text>{item.nome}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={produtos}
      renderItem={renderProductsItem}
      keyExtractor={(item) => item.id.toString()}
      
    />
  );
};

export default ListaProdutos;
