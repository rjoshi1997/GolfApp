import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  SafeAreaView, 
  ScrollView,
  StatusBar
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
      </View>
);

const LineSeparator = () => {
  return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
};

const renderItem = ({ item }) => (
  <Item row={item} />
);

const HomeScreen = props => {
  const [contentDetails,setContentDetails] = useState([])
  const [data, setData] = useState([]);
  const [reloadAgain, setReloadAgain] = useState(false);
  const CONTENT_GROUP_URL = 'http://localhost:1337/api/contents?populate=*&filters[content_group][name][$eq]=Home';

  const fetchData = async () => {
    try {
      await fetch(CONTENT_GROUP_URL)
        .then((response) => response.json())
        .then((data) => setData(data.data));

        if(data){
          const contentData = [];
          data.forEach(rows => {
              contentData.push(
                      {
                          'id':rows.id,
                          'Subject':rows.attributes.Subject,
                          'Description':rows.attributes.Description,
                          'Link':rows.attributes.Link,
                          'Video':rows.attributes.Video,
                          'Image':rows.attributes.Image,
                      }
                  )
          });
          setContentDetails(contentData)
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(!contentDetails.length){
    fetchData()
  }
  
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/HomeScrrenMainImage.jpg')} />
      <View style={styles.container}>
        <ScrollView>
        <Text class="border-solid" style={styles.titleText}>Latest News</Text>
        <LineSeparator />
          <FlatList
          data={contentDetails}
          renderItem={renderItem}
          ItemSeparatorComponent={LineSeparator}
          keyExtractor={(item) => item.id}
          >
          </FlatList>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:"white",
  },
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