import React, { useContext, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';

export default function SignIn() {

    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={800} style={styles.containerHeader}>
                <Text style={styles.message}>Bem vindo!</Text>
            </Animatable.View >

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite um email"
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType='email-address'
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                    placeholder="Sua senha"
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={() => login(email, senha)}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui conta? Cadastre-se</Text>
                </TouchableOpacity> */}

            </Animatable.View>
        </View>
    )
}
