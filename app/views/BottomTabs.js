import React, { useCallback, useEffect, useState } from 'react';
import { Image,Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import getContent from '../models/Content';
import HomeScreen from './TabScreens/HomeScreen';
import getContentGroups from '../models/ContentGroup';

function TabContantScreen(obj) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{obj.route.name}</Text>
      </View>
  )
}

function Home(obj){
  const content = require('../../contentData.json')
  return (
      <HomeScreen contentDetails={content}></HomeScreen>
  )
}

function Profile(){
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 5, backgroundColor: 'black'}} />
    </View>
  )
}

const Tab = createBottomTabNavigator();
const BottomTabs = props => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Explore' component={TabContantScreen} />
        <Tab.Screen name='News' component={TabContantScreen} />
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Courses' component={TabContantScreen} />
        <Tab.Screen name='Profile' component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs