import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native';
import {Feather, FontAwesome} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import api from '../../services/api'
import {RectButton} from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string
  }[]
}

const Detail = () => {
  const navigator = useNavigation();
  const [data, setData] = useState<Data>({} as Data)
  const route = useRoute();

 const routeParams = route.params as Params; 

 useEffect(()=> {
  api.get(`/points/${routeParams.point_id}`).then(res => {
    setData(res.data)
  })
 }, [])

  function goBack(){
    navigator.goBack();
  }

  if(!data.point) {
    return null;
  }

  function composeMail(){
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    })
  }

  function composeWpp(){
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos.`)
  }

  return(
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{uri: data.point.image_url}}/>
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map(item => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={composeWpp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF"/>
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={composeMail}>
          <Feather name="mail" size={20} color="#FFF"/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </>
  )
};

export default Detail;