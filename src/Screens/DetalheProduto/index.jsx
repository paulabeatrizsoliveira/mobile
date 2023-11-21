import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../Services/api';
import axios from 'axios'


const DetalheProduto = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  // Estado local para a descrição original do produto
  // const [productDescription, setProductDescription] = useState(
  //   `Magic Keyboard para escrever com toda a comodidade e precisão\n
  //   Sem fios e recarregável, a bateria integrada de longa duração mantém o seu teclado a funcionar durante cerca de um mês, ou até mais.\n
  //   Associa-se automaticamente ao Mac, para começar logo a trabalhar\n`
  // );

  // Exemplo de detalhes do produto (substitua com seus próprios dados)
  // const product = {
  //   image: require('../../../assets/teclado.jpg'),
  //   titulo: 'Magic Keyboard',
  //   preco: 50.0,
  // };

  
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
  };

  const handleSaveDescription = () => {
    // Atualiza o estado local com a descrição editada
    setProduto({...produto, descricao:editedDescription});   
      console.log('Descrição editada:', editedDescription);

    // Volta ao modo de visualização após salvar
    setIsEditing(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={produto.imagem} style={[styles.productImage, { maxHeight: 80 }]} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitulo}>{produto.nome}</Text>
          <Text style={styles.productPreco}>R$ {produto.valor?.toFixed(2)}</Text>

          {isEditing ? (
            <TextInput
              style={styles.editDescriptionInput}
              value={editedDescription}
              onChangeText={(text) => setEditedDescription(text)}
              multiline
            />
          ) : (
            <Text style={styles.productDescricao}>{produto.descricao}</Text>
          )}

          <View style={styles.editButtonContainer}>
            {isEditing ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveDescription}>
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
