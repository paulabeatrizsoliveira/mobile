import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetalheProduto = () => {
  // Exemplo de detalhes do produto (substitua com seus próprios dados)
  const product = {
    titulo: 'Teclado Apple',
    preco: 50.0,
    descricao: `Magic Keyboard para escrever com toda a comodidade e precisão\n
Sem fios e recarregável, a bateria integrada de longa duração mantém o seu teclado a funcionar durante cerca de um mês, ou até mais\n
Associa-se automaticamente ao Mac, para começar logo a trabalhar\n
Inclui um cabo de tecido USB-C para Lightning que permite também carregar se o ligar a uma porta USB‑C do Mac.\n
Conteúdo da caixa: Magic Keyboard, Cabo USB-C para Lightning`,
    image: require('../../assets/teclado.jpeg'),
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={product.image} style={[styles.productImage, { maxHeight: 110}]} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitulo}>{product.titulo}</Text>
          <Text style={styles.productPreco}>R$ {product.preco.toFixed(2)}</Text>
          <Text style={styles.productDescricao}>{product.descricao}</Text>
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
});

export default DetalheProduto;
