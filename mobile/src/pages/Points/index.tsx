import React from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import {Feather} from '@expo/vector-icons'
import MapView, {Marker} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Emoji from 'react-native-emoji';
import {SvgUri} from 'react-native-svg'

import styles from './styles'

const Points = () => {
  const navigator = useNavigation();

  function goBack(){
    navigator.goBack();
  }
  function toDetail(){
    navigator.navigate('Detail')
  }

  return(
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="log-out" size={20} color="#34cb79"/>
        </TouchableOpacity>

        <View style={styles.welcome}>
          <Emoji name="smiley" style={{fontSize: 18}}/>
          <Text style={styles.title}>Bem Vindo.</Text>
        </View>
        <Text style={styles.title}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView style={styles.map} initialRegion={{
            latitude: -20.456781242975893,
            longitude: -45.41749136522412,
            latitudeDelta: 0.014,
            longitudeDelta: 0.014
          }}>
            <Marker style= {styles.mapMarker} onPress={toDetail} coordinate={{
              latitude: -20.456781242975893,
              longitude: -45.41749136522412
            }}>
              <View style = {styles.mapMarkerContainer}>
                <Image style={styles.mapMarkerImage} source={{uri: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"}}/>
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}
        >
          <TouchableOpacity style={styles.item} onPress={()=> {}}>
            <SvgUri width={42} height={42} uri="http://26.174.50.121:3333/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=> {}}>
            <SvgUri width={42} height={42} uri="http://26.174.50.121:3333/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=> {}}>
            <SvgUri width={42} height={42} uri="http://26.174.50.121:3333/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=> {}}>
            <SvgUri width={42} height={42} uri="http://26.174.50.121:3333/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=> {}}>
            <SvgUri width={42} height={42} uri="http://26.174.50.121:3333/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={()=> {}}>
            <SvgUri width={42} height={42} uri="http://26.174.50.121:3333/uploads/lampadas.svg"/>
            <Text style={styles.itemTitle}>Lâmpadas</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  )
};

export default Points;