import React from  'react';
import {View, Image, Text, ImageBackground} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'

const Home = () => {
  const navigator = useNavigation();

  function toPoints() {
    navigator.navigate('Points')
  }
  
  return(
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>
          Seu marketplace de coleta de resíduos
        </Text>
        <Text style ={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={toPoints}>
          <View style={styles.buttonIcon}>
            <Feather name="arrow-right" color="#FFF" size={24}/>
          </View>
          <Text style={styles. buttonText}>Acessar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

export default Home;