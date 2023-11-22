import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../Services/api';
// import styles from './style';


const DetalheProduto = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImagem, setEditedImagem] = useState('');
  const [editedNome, setEditedNome] = useState('');
  const [editedValor, setEditedValor] = useState(0);
  const [editedEstoque, setEditedEstoque] = useState(0);
  const [editedAtivo, setEditedAtivo] = useState(false);

  
  const [produto, setProduto] = useState ([])
  useEffect(() => {
    api.get('/produto/1')
    .then((response) => {
      setProduto(response.data);
      setEditedDescription(response.data.descricao);
      console.log(response.data);
      
    }).catch(() => {
      console.log('Deu errado!');
    })
    
  },[]);

  const handleEditDescription = () => {
    setIsEditing(true);
    setEditedDescription(produto.descricao); // Inicializa a descrição editada com a descrição atual
    setEditedImagem(produto.imagem);
    setEditedNome(produto.nome);
    setEditedValor(produto.valor);
    setEditedEstoque(produto.estoque);
    setEditedAtivo(produto.ativo);
  };

  const handleSave = async () => {
    // Atualiza o estado local com a descrição editada
      try{
        const atualizarProduto = {
          ...produto, 
          imagem: editedImagem,
          nome: editedNome,
          valor: editedValor,
          estoque: editedEstoque,
          ativo: editedAtivo,
        
        }; // Pegando as informações do produto que está sendo editada na api.
        await api.put(`/produto/${produto.id}/`, atualizarProduto);
        setProduto(atualizarProduto);
        setIsEditing(false);

      }catch (e) {
        console.log("Erro ao salvar alterações!", e);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={produto.imagem} style={[styles.productImage, { maxHeight: 80 }]} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitulo}>{produto.nome}</Text>
          <Text style={styles.productPreco}>R$ {produto.valor?.toFixed(2)}</Text>

          {isEditing ? (
            <View>
              <Text>Descrição do Produto</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedDescription}
              onChangeText={(text) => setEditedDescription(text)}
              multiline
            />
            <Text>Imagem do Produto</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedImagem}
              onChangeText={(text) => setEditedImagem(text)}
            />
            <Text>Nome do Produto</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedNome}
              onChangeText={(text) => setEditedNome(text)}
              
            />
            <Text>Valor do Produto</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedValor}
              onChangeText={(text) => setEditedValor(text)}
              keyboardType='numeric'
            />
            <Text>Estoque de Produto</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedEstoque}
              onChangeText={(text) => setEditedEstoque(text)}
              keyboardType='numeric'
            />
            <Text>Produto Ativo</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedAtivo}
              onChangeText={(text) => setEditedAtivo(text)}
              multiline //comando para mudar para false.
            />
            </View>

          ) : (
            <Text style={styles.productDescricao}>{produto.descricao}</Text>
          )}

          <View style={styles.editButtonContainer}>
            {isEditing ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Feather name="check" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEditDescription}>
                <Feather name="edit" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
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
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productDetails: {
    marginTop: 16,
    alignItems: 'center',
  },
  productTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPreco: {
    fontSize: 18,
    color: 'green',
    marginBottom: 8,
  },
  productDescricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  editDescriptionInput: {
    height: 100,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    borderColor: '#38A69D',
    borderWidth: 1,
    borderRadius: 8,
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
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
  },
});

export default DetalheProduto;
