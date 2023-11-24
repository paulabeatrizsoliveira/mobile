import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38A69D',
  },
  flatListContainer: {
    flex: 0.95,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 30,
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

  reativarButton:{
    backgroundColor: "#00d2ff",
    padding: 8,
    borderRadius: 5,
    marginRight: 6,
  },
  botaoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
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
  itemButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  itemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;