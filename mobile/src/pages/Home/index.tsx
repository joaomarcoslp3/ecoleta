import React, {useState} from  'react';
import {View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'

const Home = () => {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const navigator = useNavigation();

  function toPoints() {
    navigator.navigate('Points', {
      uf,
      city
    })
  }
  
  return(
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground 
        source={require('../../assets/home-background.png')} 
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')}/>
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style ={styles.description}>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput
            style= {styles.input}
            placeholder= "Digite a UF"
            value= {uf}
            onChangeText={setUf}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <TextInput
            style= {styles.input}
            placeholder= "Digite a cidade"
            value= {city}
            onChangeText={setCity}
            autoCorrect={false}
          />
          <RectButton style={styles.button} onPress={toPoints}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#FFF" size={24}/>
            </View>
            <Text style={styles. buttonText}>Acessar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home;