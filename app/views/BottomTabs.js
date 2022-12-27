import React, { useCallback, useEffect, useState } from 'react';
import { Image,Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './TabScreens/HomeScreen';
import ProfileScreen from './TabScreens/ProfileScreen';

function TabContantScreen(obj) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{obj.route.name}</Text>
      </View>
  )
}

function Home(obj){
  return (
      <HomeScreen></HomeScreen>
  )
}

function Profile(){
  return (
    <ProfileScreen />
  )
}

const Tab = createBottomTabNavigator();
const BottomTabs = props => {
  // const [activeGroups,setActiveGroups] = useState([])
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await fetch(`http://localhost:1337/api/content-groups`)
  //         .then((response) => response.json())
  //         .then((data) => setData(data.data));

  //         if(data.length){
  //           const sortData = data.sort((a,b) => 
  //               a.attributes.sort_order - b.attributes.sort_order
  //           );

  //           const activeData = [];
  //           sortData.forEach(rows => {
  //               if(rows.attributes.is_active && rows.id){
  //                   activeData.push(
  //                           {
  //                               'id':rows.id,
  //                               'name':rows.attributes.name
  //                           }
  //                       )
  //               }
  //           });
  //           setActiveGroups(activeData)
  //         }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);
 
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Explore' component={TabContantScreen} />
        <Tab.Screen name='News' component={TabContantScreen} />
        <Tab.Screen name='Home' component={Home} listeners={{
            tabPress: (e) => {
              
            },
          }}/>
        <Tab.Screen name='Courses' component={TabContantScreen} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs