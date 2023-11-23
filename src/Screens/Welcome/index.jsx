import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native'
import styles from './styles';


export default function Welcome() {
  const navigation = useNavigation();

    return(
        <View style={styles.container}> 

            <View style={styles.containerLogo}>
              <Animatable.Image
                animation="flipInY"
                source={require('../../../assets/Logo/logo.png')}
                style={ { width: '100%'}}
                resizeMode='contain'
              />
            </View>

        <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
          <Text style={styles.title}>O Melhor Gerenciador de Ecommerce do Mundo</Text>
          <Text style={styles.text}>Faça o login para começar</Text>

          <TouchableOpacity onPress={ () => navigation.navigate('SignIn')} style={styles.button}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </Animatable.View>    

        </View>
    )
}

