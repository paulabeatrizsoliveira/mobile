import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import * as Animatable from 'react-native-animatable'
// import React, { Component } from 'react'

export default function SignIn() {
    return(
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={800} style={styles.containerHeader}>
                <Text style={styles.message}>Bem vindo!</Text>
            </Animatable.View >

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
             <Text style={styles.title}>Email</Text>
             <TextInput
               placeholder="Digite um email"
               style={styles.input}
             />

            <Text style={styles.title}>Senha</Text>
             <TextInput
               placeholder="Sua senha"
               style={styles.input}
             />

             <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Acessar</Text>
             </TouchableOpacity>

             <TouchableOpacity style={styles.buttonRegister}>
                <Text style={styles.registerText}>Não possui conta? Cadastre-se</Text>
             </TouchableOpacity>

            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38A69D',        
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    containerForm: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopStartRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#38A69D',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText: {
        color: '#a1a1a1'
    }

})
