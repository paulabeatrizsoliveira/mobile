import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: '#38A69D',
    },
    flatListContainer: {
      flex: 0.95,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 24,
      color: '#fff',
      fontWeight: "bold",
      marginVertical: 20,
      textAlign: 'center',
    },
    list: {
      width: "100%",
    },
    item: {
      padding: 10,
      backgroundColor: "#F5F5F5",
      borderRadius: 8,
      marginBottom: 10,
    },
    itemText: {
      fontSize: 20,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#F5F5F5",
      borderRadius: 8,
      marginBottom: 10,
    },
    deleteContainer: {
      backgroundColor: "white",
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      padding: 5,
    },
    deleteButton: {
      backgroundColor: "red",
      padding: 8,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    botaoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: 40,
      borderColor: '#fff',
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    buttonText: {
      fontSize: 25,
      color: "#fff",
    },
    buttonAdicionar: {
      height: 40,
      borderColor: '#fff',
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: 'green',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      width: '90%',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 8,
      marginBottom: 10,
      width: '100%',
    },
    buttonAdicionar: {
      height: 40,
      width: 150,
      backgroundColor: '#38A69D',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 8,
    },
  });
  
  export default styles;