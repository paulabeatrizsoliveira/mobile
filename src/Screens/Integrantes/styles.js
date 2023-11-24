import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#38A69D',
    },
    tituloContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    conteudoContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingVertical: 20,
    },
    pessoaContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    pessoaImagem: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 10,
    },
    pessoaNome: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#fff',
    },
    descricaoPessoa: {
      textAlign: 'center',
      paddingHorizontal: 20,
      color: '#fff',
    },
  });

  export default styles;