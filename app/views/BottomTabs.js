import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./TabScreens/HomeScreen";
import ProfileScreen from "./TabScreens/ProfileScreen";
import WebView from "react-native-webview";

function TabContantScreen(obj) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{obj.route.name}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function Home(obj) {
  return <HomeScreen></HomeScreen>;
}

function Profile() {
  return <ProfileScreen />;
}

function News() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://www.pgatour.com/champions/news.html" }}
      />
    </View>
  );
}

function Courses() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: "https://www.pgatour.com/champions/tournaments/schedule.html",
        }}
      />
    </View>
  );
}

const BottomTabs = (props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Explore" component={TabContantScreen} />
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Courses" component={Courses} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabs;
