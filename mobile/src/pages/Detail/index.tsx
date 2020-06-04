import React from 'react';
import {View, TouchableOpacity, Image, Text, SafeAreaView} from 'react-native';
import {Feather, FontAwesome} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import {RectButton} from 'react-native-gesture-handler'

const Detail = () => {
  const navigator = useNavigation();

  function goBack(){
    navigator.goBack();
  }

  return(
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{uri: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}}/>
        <Text style={styles.pointName}>Mercadão do João</Text>
        <Text style={styles.pointItems}>Lâmpadas, Óleo de Cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Formiga, MG</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={()=> {}}>
          <FontAwesome name="whatsapp" size={20} color="#FFF"/>
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={()=> {}}>
          <Feather name="mail" size={20} color="#FFF"/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </>
  )
};

export default Detail;