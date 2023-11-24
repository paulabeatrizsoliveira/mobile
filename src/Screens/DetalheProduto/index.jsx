import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../Services/api';
import { ActivityIndicator } from 'react-native';
import styles from './style';


const DetalheProduto = ({ route, navigation }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImagem, setEditedImagem] = useState('');
  const [editedNome, setEditedNome] = useState('');
  const [editedValor, setEditedValor] = useState(0);
  const [editedEstoque, setEditedEstoque] = useState(0);
  const [editedAtivo, setEditedAtivo] = useState(0);

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
      const ativo = editedEstoque !== 0; // Determina o estado "ativo" com base no estoque inserido

      const atualizarProduto = {
        ...produto,
        descricao: editedDescription,
        imagem: editedImagem,
        nome: editedNome,
        valor: editedValor,
        estoque: editedEstoque,
        ativo,
      };

      await api.put(`/produto/${produto.id}/`, atualizarProduto);
      setProduto(atualizarProduto);
      setProdutos(produtos.map(p => p.id === produto.id ? atualizarProduto : p));
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
                  value={editedValor === 0 ? '0' : editedValor.toString()} // Garante que o zero seja exibido corretamente
                  onChangeText={(text) => {
                    if (text === '') {
                      setEditedValor(0);
                    } else if (text === '0' || !isNaN(parseFloat(text))) {
                      const numero = parseFloat(text);
                      setEditedValor(numero);
                    } else {
                      alert('Insira um número válido!');
                    }
                  }}
                  keyboardType='numeric'
                  placeholder="Valor do Produto"
                />

                <Text style={styles.estoqueEdicao}>Estoque de Produto:</Text>
                <TextInput
                  style={styles.editDescriptionInput}
                  value={editedEstoque === 0 ? '0' : editedEstoque.toString()}
                  onChangeText={(text) => {
                    if (text === '') {
                      setEditedEstoque(0);
                      setEditedAtivo(false); // Atualiza o estado "ativo" para false se o estoque for zero
                    } else if (text === '0' || !isNaN(parseFloat(text))) {
                      const numero = parseFloat(text);
                      setEditedEstoque(numero);
                      // Atualize o status "ativo" baseado no estoque inserido
                      const ativo = numero !== 0; // Se o estoque não for zero, ativo é true
                      setEditedAtivo(ativo); // Atualiza o estado "ativo" com base no estoque
                    } else {
                      alert('Insira um número válido!');
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

export default DetalheProduto;
