import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable
} from 'react-native';

const Item = ({ row }) => (
  <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',padding: 10}}>
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',}}>
          <Text
            style={{
              width: '65%',
              fontSize: 16,
              fontWeight: '500',
              alignItems: 'center',
            }}>
            {row.Subject}
          </Text>
          <Image
          source={{uri: row.Image}}
          style={{
            width: 80,
            height: 80,
            borderRadius:10,
          }}
        />
          <Text
            style={{
              width: '100%',
              fontSize: 12,
              marginTop: 10,
              marginBottom:10,
            }}>
            {row.Description.substring(0, 150) + '...'}
          </Text>  
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
    </View>
    
);
const renderItem = ({ item }) => (
  <Item row={item} />
);

const HomeScreen = props => {
  return (
    <View>
      <Image source={require('../../../assets/HomeScrrenMainImage.jpg')} />
      <Text class="border-solid" style={styles.titleText}>Latest News</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ flex: 1, height: 2, backgroundColor: 'black'}} />
      </View>
      <View>
        <FlatList
        data={props.contentDetails}
        renderItem={renderItem}
        >
        </FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    padding:10,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin",
    // backgroundColor:"#D0C2B2",
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pressedItem: {
    opacity: 0.5,
  },
});

export default HomeScreen;