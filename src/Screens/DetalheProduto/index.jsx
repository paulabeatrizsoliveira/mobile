import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../Services/api';
import { ActivityIndicator } from 'react-native';
// import styles from './style';


const DetalheProduto = ({ route }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImagem, setEditedImagem] = useState('');
  const [editedNome, setEditedNome] = useState('');
  const [editedValor, setEditedValor] = useState(0);
  const [editedEstoque, setEditedEstoque] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { id } = route.params;

  const [produto, setProduto] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/produto/${id}`)
      .then((response) => {
        setProduto(response.data);
        setEditedDescription(response.data.descricao);
        setIsLoading(false);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
        setIsLoading(false);
      });
  }, [id]);

  const handleEditDescription = () => {
    setIsModalVisible(true);
    setEditedDescription(produto.descricao);
    setEditedImagem(produto.imagem);
    setEditedNome(produto.nome);
    setEditedValor(produto.valor);
    setEditedEstoque(produto.estoque);
  };

  const handleSave = async () => {
    try {
      const atualizarProduto = {
        ...produto,
        descricao: editedDescription,
        imagem: editedImagem,
        nome: editedNome,
        valor: editedValor,
        estoque: editedEstoque,
      };

      await api.put(`/produto/${produto.id}/`, atualizarProduto);
      setProduto(atualizarProduto);
      setIsEditing(false);
      setIsModalVisible(false);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
    } catch (e) {
      console.log("Erro ao salvar alterações!", e);
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {isLoading && <ActivityIndicator animating={true} color='#38A69D' />}
      <View style={styles.container}>

        <View style={styles.productDetails}>
          <Text style={styles.productTitulo}>{produto.nome}</Text>
          <Image source={{ uri: produto.imagem }} style={[styles.productImage, { maxHeight: 300 }]} />
          <Text style={styles.productPreco}>R$ {produto.valor?.toFixed(2)}</Text>
          <Text style={styles.productEstoque}>Estoque: {produto.estoque}</Text>

          {isEditing ? (
            <Text style={styles.productDescricao}>{editedDescription}</Text>
          ) : (
            <Text style={styles.productDescricao}>{produto.descricao}</Text>
          )}

          <TouchableOpacity style={styles.editButton} onPress={handleEditDescription}>
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Produto</Text>

                <Text style={styles.descricaoEdicao}>Descrição do Produto:</Text>
                <TextInput
                  style={styles.editDescriptionInput}
                  value={editedDescription}
                  onChangeText={(text) => setEditedDescription(text)}
                  multiline
                  placeholder="Descrição do Produto"
                />

                <Text style={styles.imagemEdicao}>Imagem do Produto:</Text>
                <TextInput
                  style={styles.editDescriptionInput}
                  value={editedImagem}
                  onChangeText={(text) => setEditedImagem(text)}
                  placeholder="Imagem do Produto"
                />

                <Text style={styles.nomeEdicao}>Nome do Produto:</Text>
                <TextInput
                  style={styles.editDescriptionInput}
                  value={editedNome}
                  onChangeText={(text) => setEditedNome(text)}
                  placeholder="Nome do Produto"
                />

                <Text style={styles.valorEdicao}>Valor do Produto:</Text>
                <TextInput
                  style={styles.editDescriptionInput}
                  value={editedValor.toString()}
                  onChangeText={(text) => {
                    const numero = parseFloat(text);
                    if (!isNaN(numero)) {
                      setEditedValor(numero);
                    } else {
                      alert('Insira um número válido!')
                    }
                  }}
                  keyboardType='numeric'
                  placeholder="Valor do Produto"
                />

                <Text style={styles.estoqueEdicao}>Estoque de Produto:</Text>
                <TextInput
                  style={styles.editDescriptionInput}
                  value={editedEstoque.toString()}
                  onChangeText={(text) => {
                    const numero = parseFloat(text);
                    if (!isNaN(numero)) {
                      setEditedEstoque(numero);
                    } else {
                      alert('Insira um número válido!')
                    }
                  }}
                  keyboardType='numeric'
                  placeholder="Estoque do Produto"
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginTop: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  productDetails: {
    flex: 0.9,
    marginTop: 16,
    alignItems: 'center',
  },
  productTitulo: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPreco: {

    fontSize: 18,
    color: 'green',
    marginVertical: 10,
  },
  productEstoque: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,

  },
  productDescricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  editDescriptionInput: {
    height: 50,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    borderColor: '#38A69D',
    borderWidth: 1,
    borderRadius: 8,
  },
  botaoContainer: {
    flex: 0.1,
    alignItems: 'flex-end'
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
  },
  saveButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
  },
  descricaoEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  imagemEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  nomeEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  valorEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  estoqueEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  editDescriptionInput: {
    height: 60,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    borderColor: '#38A69D',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
  },

  saveButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },

  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DetalheProduto;
