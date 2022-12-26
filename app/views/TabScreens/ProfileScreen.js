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
  TouchableOpacity
} from 'react-native';

const LineSeparator = () => {
  return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
};

function SignUpAction(){
  console.log('SignUp')
}

function SignInAction(){
  console.log('SignIn')
}

const ProfileScreen = props => {
 
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.titleText}>Profile</Text>
      <View style={{ height: 0.3, backgroundColor: "grey",marginHorizontal:10}} />
      
      <View>
        <Text style={styles.createAccount}>Create Account</Text>
        <Text style={styles.createAccountDetails}>Create an account to save all your preferences. It's your login for this app.</Text>
      </View>
      
      <View style={styles.signButtons}>
        <TouchableOpacity onPress={SignUpAction} style={styles.signupButton}>          
            <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={SignInAction} style={styles.signinButton}>          
            <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer : {
    flex: 1,
    backgroundColor:"white",
  },
  titleText: {
    padding:10,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  createAccount:{
    paddingLeft:20,
    paddingTop:20,
    paddingBottom:10,
    fontSize: 20,
  },
  createAccountDetails:{
    fontSize: 15,
    paddingLeft:20,
    paddingRight:10,
  },
  signButtons: {
    paddingTop:40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize:14,
  },
  signupButton:{
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: 'black',
    fontWeight:'bold',
  },
  signinButton:{
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth:1,
  }
});

export default ProfileScreen;