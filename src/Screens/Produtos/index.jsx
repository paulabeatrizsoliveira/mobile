import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
import api from "../../Services/api";
import { AuthContext } from '../../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import styles from "./styles";



const Produtos = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const [produtosInativos, setProdutosInativos] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoProduto, setNovoProduto] = useState({});
  const { logout } = useContext(AuthContext);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/produto");
        setProdutos(response.data.filter(produto => produto.ativo));
        setProdutosInativos(response.data.filter(produto => !produto.ativo));
      } catch (error) {
        console.log("Erro ao buscar Produto", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const detalheProduto = (produtoId) => {
    navigation.navigate("DetalheProduto", { id: produtoId });
  };

  const deleteProduto = async (produtoId) => {
    try {
      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja desativar este produto?',
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
              setProdutosInativos([...produtosInativos, produtos.find((produto) => produto.id === produtoId)]);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (e) {
      console.log('Erro ao desativar produto', e);
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

  const reativarProduto = async (produtoId) => {
    try {
      const produtoReativado = produtosInativos.find((produto) => produto.id === produtoId);

      Alert.alert(
        'Confirmar reativação',
        'Tem certeza que deseja reativar este produto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              try {
                await api.put(`/produto/${produtoId}`, { ativo: true, estoque: 1 });
                setProdutosInativos(produtosInativos.filter((produto) => produto.id !== produtoId));
                setProdutos([...produtos, produtoReativado]);
                Alert.alert('Produto reativado com sucesso!');
              } catch (error) {
                console.log('Erro ao reativar produto:', error);
                Alert.alert('Erro ao reativar produto. Tente novamente.');
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log('Erro ao reativar produto', error);
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
      {isLoading && <ActivityIndicator animating={true} color='#fff' />}
      <View style={styles.flatListContainer}>
        <Text style={styles.titulo}>Produtos</Text>
        <FlatList
          data={produtos.filter((produto) => produto.ativo && produto.estoque !== 0)}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
        {produtosInativos.length > 0 && <Text style={styles.titulo}>Produtos Inativos</Text>}
        <FlatList
          data={produtosInativos}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => detalheProduto(item.id)} style={styles.item}>
                <Text style={styles.itemText}>{item.nome}</Text>
              </TouchableOpacity>
              <View style={styles.reativarContainer}>
                <TouchableOpacity onPress={() => reativarProduto(item.id)} style={styles.reativarButton}>
                  <Feather name="refresh-ccw" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
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

export default Produtos;