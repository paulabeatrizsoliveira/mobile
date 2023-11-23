import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import api from '../../Services/api';
import { ActivityIndicator } from 'react-native';
// import styles from './style';


const DetalheProduto = ({route}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImagem, setEditedImagem] = useState('');
  const [editedNome, setEditedNome] = useState('');
  const [editedValor, setEditedValor] = useState(0);
  const [editedEstoque, setEditedEstoque] = useState(0);
  const [editedAtivo, setEditedAtivo] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const loadData = async () =>{
  //     await new Promise(resolve => setTimeout(resolve, 2000));
  //     setIsLoading(false);
  //   };

  //   loadData();
  // }, []);

  const {id} = route.params;
  
  const [produto, setProduto] = useState ([])
  useEffect(() => {
    setIsLoading(true);
    api.get(`/produto/${id}`)
    .then((response) => {
      setProduto(response.data);
      setEditedDescription(response.data.descricao);
      console.log(response.data);

    }).catch(() => {
      console.log('Deu errado!');
    }).finally(() =>  setIsLoading(false)
      

    )
  
    
  },[id]);

  const handleEditDescription = () => {
    setIsEditing(true);
    setEditedDescription(produto.descricao); 
    setEditedImagem(produto.imagem);
    setEditedNome(produto.nome);
    setEditedValor(produto.valor);
    setEditedEstoque(produto.estoque);
    setEditedAtivo(produto.ativo);
  };

  const handleSave = async () => {
 
      try{
        const atualizarProduto = {
          ...produto,
          descricao: editedDescription,
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
      {isLoading && <ActivityIndicator animating={true} color='#38A69D'/>}
      <View style={styles.container}>
        <Image source={{uri: produto.imagem}} style={[styles.productImage, { maxHeight: 80 }]} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitulo}>{produto.nome}</Text>
          <Text style={styles.productPreco}>R$ {produto.valor?.toFixed(2)}</Text>
          <Text style={styles.productEstoque}>Estoque: {produto.estoque}</Text>


          {isEditing ? (
            <View>
              <Text style={styles.descricaoEdicao}>Descrição do Produto:</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedDescription}
              onChangeText={(text) => setEditedDescription(text)}
              multiline
            />
            <Text style={styles.imagemEdicao}>Imagem do Produto:</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedImagem}
              onChangeText={(text) => setEditedImagem(text)}
            />
            <Text style={styles.nomeEdicao}>Nome do Produto:</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedNome}
              onChangeText={(text) => setEditedNome(text)}
              
            />
            <Text style={styles.valorEdicao}>Valor do Produto:</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedValor}
              onChangeText={(text) => {
                const numero = parseFloat(text);
                if(!isNaN(numero)){
                  setEditedValor(numero);
                }else {
                  alert('Insira um número válido!')
                }  
              }}
              keyboardType='numeric'
            />
            <Text style={styles.estoqueEdicao}>Estoque de Produto:</Text>
            <TextInput
              style={styles.editDescriptionInput}
              value={editedEstoque}
              onChangeText={(text) => {
                const numero = parseFloat(text);
                if(!isNaN(numero)){
                  setEditedEstoque(numero);
                }else {
                  alert('Insira um número válido!')
                }
                
              }}
              keyboardType='numeric'
            />
            <Text style={styles.ativoEdicao}>Produto Ativo:</Text>
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
    marginTop: 20,
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
  productEstoque:{
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
    height: 100,
    fontSize: 16,
    fontStyle: 'italic',
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
    marginTop: 210,
    marginLeft: 200,
  },
  saveButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
  },
  descricaoEdicao:{
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
  nomeEdicao:{
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  valorEdicao:{
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  estoqueEdicao:{
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  ativoEdicao:{
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },

});

export default DetalheProduto;
