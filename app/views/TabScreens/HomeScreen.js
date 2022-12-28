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
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Modal
} from 'react-native';

const LineSeparator = () => {
  return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
};

const HomeScreen = props => {
  const video = React.useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  let [contentDetails,setContentDetails] = useState([])
  let [data, setData] = useState([]);
  let [currentItem, setCurrentItem] = useState([]);
  const [reloadAgain, setReloadAgain] = useState(false);
  const CONTENT_GROUP_URL = 'http://localhost:1337/api/contents?populate=*&filters[content_group][name][$eq]=Home';

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
            {/* <Text
              style={{
                width: '100%',
                fontSize: 12,
                marginTop: 10,
                marginBottom:10,
              }}>
              {row.Description.substring(0, 150) + '...'}
            </Text>   */}
          </View>
        </View>
  );
  
  const LineSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
  };
  
  function itemModal(obj) {
    setCurrentItem(obj)
    setModalVisible(!isModalVisible);
  }

  const ModalContent = () => {
    
    return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          keyExtractor={(currentItem, index) => currentItem.id}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
          >
            <View style={styles.modalContainer}>
            
              <View style={styles.modalView}>
              
                <View style={styles.modalHeaderCloseButton}>
                    <Pressable
                      onPress={() => setModalVisible(!isModalVisible)}
                    >
                    <Text style={{fontSize:18}}>X</Text>
                  </Pressable>
                </View>
                <View style={styles.container}>
                <ScrollView>
                  <View style={{paddingTop:20,paddingLeft:30}}>
                    <Image source={{uri: currentItem.Image}}
                        style={{
                          width: 300,
                          height: 300,
                          borderRadius:10,
                        }}>
                      </Image>
                  </View>

                  <View style={styles.container}>
                      <Text style={{fontSize:20,padding:20,fontWeight:'bold'}}>{currentItem.Subject}</Text>
                      <LineSeparator />
                      <Text style={{fontSize:14,padding:20}}>{currentItem.Description}</Text>
                  </View>
                </ScrollView>
                </View>
                </View>
              </View>
          </Modal>
    );
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => itemModal(item)} >          
        <Item row={item} />
        <ModalContent />
    </TouchableOpacity>
  );
  const fetchData = async () => {
    try {
      await fetch(CONTENT_GROUP_URL)
        .then((response) => response.json())
        .then((data) => setData(data.data));

        if(data){
          let contentData = [];
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
          setReloadAgain(false);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    setReloadAgain(true);
    fetchData();
  }

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
          <Text class="border-solid" style={styles.titleText}>Latest News</Text>
          <LineSeparator />
          <FlatList
          data={contentDetails}
          renderItem={renderItem}
          ItemSeparatorComponent={LineSeparator}
          keyExtractor={(item) => item.id}
          refreshing={reloadAgain}
          onRefresh={handleRefresh}
          >
          </FlatList>
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
  modalContainer: {
    flex: 1,
    marginTop: 50,
  },
  modalView: {
    flex: 1,
    height:600,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalHeaderCloseButton: {
    alignItems:'flex-end',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default HomeScreen;