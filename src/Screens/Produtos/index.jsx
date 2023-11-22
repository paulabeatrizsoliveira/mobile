import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


const Produtos = () => {

  const { logout } = useContext(AuthContext)

  return (
    <View style={Styles.container}>
      <Text>Produtos</Text>
      <TouchableOpacity style={Styles.botao}>
        <Text style={Styles.textoBotao} onPress={logout}>Sair do App</Text>
      </TouchableOpacity>
    </View>
  )
};

export default Produtos

const Styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao:{
    width: '40%',
    height: 40,
    backgroundColor: '#38A69D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',

  },
  textoBotao:{
    fontSize: 20,
    color: '#fff'
  },
})