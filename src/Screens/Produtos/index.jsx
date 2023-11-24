import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
import api from "../../Services/api";
import { AuthContext } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import Stack from "../../routes/stack";
import Tabs from "../../routes/tabs";


const Produtos = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoProduto, setNovoProduto] = useState({});
  const { logout } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get("/produto")
      .then((response) => {
        setProdutos(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log("Erro ao buscar Produto", e);
        setIsLoading(false);
      });
  }, []);

  const detalheProduto = (produtoId) => {
    navigation.navigate("DetalheProduto", { id: produtoId });
  };

  const deleteProduto = async (produtoId) => {
    try {
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir este produto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              await api.put(`/produto/${produtoId}`, { ativo: false });
              setProdutos(produtos.filter((produto) => produto.id !== produtoId));
            },
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.log('Erro ao deletar produto', e);
    }
  };

  const adicionarProduto = async () => {
    try {
      if (
        !novoProduto.nome ||
        !novoProduto.descricao ||
        !novoProduto.valor ||
        !novoProduto.estoque ||
        !novoProduto.imagem
      ) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const response = await api.post("/produto", {
        ...novoProduto,
        ativo: true,
      });

      if (response.status === 201) {
        setModalVisivel(false);
        setProdutos([...produtos, response.data]);
        setNovoProduto({});
        alert('Produto adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar o produto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
      alert('Erro ao adicionar o produto. Tente novamente.');
    }
  };

  const renderProduto = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => detalheProduto(item.id)} style={styles.item}>
        <Text style={styles.itemText}>{item.nome}</Text>
      </TouchableOpacity>
      <View style={styles.deleteContainer}>
        <TouchableOpacity onPress={() => deleteProduto(item.id)} style={styles.deleteButton}>
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator animating={true} color='#38A69D' />}
      <View style={styles.flatListContainer}>
        <Text style={styles.titulo}>Produtos</Text>
        <FlatList
          data={produtos.filter((produto) => produto.ativo)}
          renderItem={renderProduto} // Usar a função renderProduto aqui
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </View>
      <View style={styles.botaoContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisivel(true)}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Sair do App</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Componentes para adicionar um novo produto */}
            <TextInput
              style={styles.input}
              placeholder="Nome do Produto"
              onChangeText={(text) =>
                setNovoProduto({ ...novoProduto, nome: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição do Produto"
              onChangeText={(text) =>
                setNovoProduto({ ...novoProduto, descricao: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Valor do Produto"
              onChangeText={(text) =>
                setNovoProduto({ ...novoProduto, valor: parseInt(text) })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Estoque do Produto"
              onChangeText={(text) =>
                setNovoProduto({ ...novoProduto, estoque: parseInt(text) })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Imagem do Produto"
              onChangeText={(text) =>
                setNovoProduto({ ...novoProduto, imagem: text })
              }
            />
            <TouchableOpacity style={styles.buttonAdicionar} onPress={adicionarProduto}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisivel(false)}>
              <Text style={{ ...styles.buttonText, color: 'red' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteContainer: {
    backgroundColor: "white",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    padding: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  botaoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
  },
  buttonAdicionar: {
    height: 40,
    borderColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: 'green',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  buttonAdicionar: {
    height: 40,
    width: 150,
    backgroundColor: '#38A69D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default Produtos;