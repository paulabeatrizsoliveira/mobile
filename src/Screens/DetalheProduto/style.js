import { StyleSheet } from "react-native";

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

  export default styles;