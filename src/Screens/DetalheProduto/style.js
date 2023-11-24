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
    marginTop: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  productDetails: {
    flex: 0.9,
    marginTop: 16,
    alignItems: 'center',
  },
  productTitulo: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPreco: {

    fontSize: 18,
    color: 'green',
    marginVertical: 10,
  },
  productEstoque: {
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
    height: 50,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    borderColor: '#38A69D',
    borderWidth: 1,
    borderRadius: 8,
  },
  botaoContainer: {
    flex: 0.1,
    alignItems: 'flex-end'
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
  },
  saveButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
  },
  descricaoEdicao: {
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
  nomeEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  valorEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  estoqueEdicao: {
    fontSize: 20,
    fontWeight: 'bold',
    display: 'flex',
    marginBottom: 3,
    marginTop: 20,
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  editDescriptionInput: {
    height: 60,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
    borderColor: '#38A69D',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
  },

  saveButton: {
    backgroundColor: '#38A69D',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },

  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;