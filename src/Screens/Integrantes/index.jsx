import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './styles';

const equipe = [
  {
    name: 'Patrícia',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://avatars.githubusercontent.com/u/99268893?v=4',
  },
  {
    name: 'Paula',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://avatars.githubusercontent.com/u/142060967?v=4',
  },  
  {
    name: 'Róger',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://avatars.githubusercontent.com/u/141455473?v=4',
  },
  {
    name: 'Victor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://avatars.githubusercontent.com/u/142061047?v=4',
  },
  {
    name: 'Yslanio',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://media-gig4-1.cdn.whatsapp.net/v/t61.24694-24/383479774_1386027178676357_6783184291419737998_n.jpg?ccb=11-4&oh=01_AdRKCdoCWdtt94gjMhxioEd5oTqjSrsLt3QS5iV_glp8TA&oe=656CC812&_nc_sid=e6ed6c&_nc_cat=105',
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