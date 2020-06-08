import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, ScrollView, Image, Alert} from 'react-native';
import {Feather} from '@expo/vector-icons'
import MapView, {Marker} from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import Emoji from 'react-native-emoji';
import {SvgUri} from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location'

import styles from './styles';

interface Item{
  id: number;
  title: string;
  image_url: string
}

interface Point {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

interface Params{
  uf: string;
  city: string
}


const Points = () => {
  const route = useRoute();
  const routeParams = route.params as Params;
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<Number[]>([]);
  const [points, setPoints] = useState<Point[]>([])
  const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0])

  useEffect(()=> {
    api.get('/items').then(res => {
      setItems(res.data)
    })
  }, []);
  useEffect(()=> {
    async function loadPosition(){
      const {status} = await Location.requestPermissionsAsync();
      if (status !== 'granted'){
        Alert.alert('Ops!', 'Precisamos de sua permissão para obter a localização.');
        return;
      } 

      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;
      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);
  useEffect(()=> {
    api.get('points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then(res => {
      setPoints(res.data)
    })
  }, [selectedItems])


  const navigator = useNavigation();

  function goBack(){
    navigator.goBack();
  }
  function toDetail(id: number){
    navigator.navigate('Detail', { point_id: id })
  }

  function handleSelectItems(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if(alreadySelected >= 0){
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
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
          {initialPosition[0] !== 0 && (
             <MapView style={styles.map} loadingEnabled={initialPosition[0] === 0} initialRegion={{
              latitude: Number(initialPosition[0]),
              longitude: Number(initialPosition[1]),
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}>
              {points.map(point => (
                <Marker 
                  key={String(point.id)} 
                  style= {styles.mapMarker} 
                  onPress={()=> toDetail(point.id)} 
                  coordinate={{
                    latitude: Number(point.latitude),
                    longitude: Number(point.longitude),
                }}>
                  <View style = {styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{uri: point.image}}/>
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          ) }
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}
        >
          {items.map(item => (
            <TouchableOpacity 
              key={String(item.id)} 
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]} 
              onPress={() => handleSelectItems(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url}/>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  )
};

export default Points;