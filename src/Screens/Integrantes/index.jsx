import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './styles';

const equipe = [
  {
    name: 'Patrícia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Paula',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Roger',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Victor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Yslanio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://via.placeholder.com/150',
  },
];

const Integrantes = () => {
  const sortedTeamMembers = equipe.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.conteudoContainer}>
      <View style={styles.tituloContainer}>
        <Text style={styles.titulo}>Integrantes</Text>
      </View>
        {sortedTeamMembers.map((pessoa, index) => (
          <View style={styles.pessoaContainer} key={index}>
            <Image source={{ uri: pessoa.imageUrl }} style={styles.pessoaImagem} />
            <Text style={styles.pessoaNome}>{pessoa.name}</Text>
            <Text style={styles.descricaoPessoa}>{pessoa.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Integrantes;