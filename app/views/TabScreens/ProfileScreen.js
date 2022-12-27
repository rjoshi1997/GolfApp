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
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';

const LineSeparator = () => {
  return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
};

const ProfileScreen = props => {
  const [isModalSignUpVisible, setModalSignUpVisible] = useState(false);
  let [firstName,setFirstName] = useState(null);
  let [lastName,setLastName] = useState(null);
  let [email,setEmail] = useState(null);
  let [passowrd,setPassword] = useState(null);
  let [confirmPassword,setConfirmPassword] = useState(null);
  let [validate,setValidate] = useState(true);

  // async function validateField() {
    
  //   if(firstName==="" || firstName === null){
  //     setValidate(false)
  //     Alert.alert(
  //       "Error",
  //       "Please Enter First Name",
  //       [
  //         { text: "OK" }
  //       ]
  //     );
  //   }
  //   console.log()
  //   return validate;
  // }

  const CompleteSignUp = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: passowrd,
            username: firstName+"_"+lastName,
          }),
          method: 'POST',
        }
      );
      Alert.alert(
          "Thanks For Signing Up",
          "We will keep you posted on the latest news.",
          [
            { text: "OK", onPress: () => setModalSignUpVisible(!isModalSignUpVisible)}
          ]
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.titleText}>Profile</Text>
      <View style={{ height: 0.3, backgroundColor: "grey",marginHorizontal:10}} />
      
      <View>
        <Text style={styles.createAccount}>Create Account</Text>
        <Text style={styles.createAccountDetails}>Create an account to save all your preferences. It's your login for this app.</Text>
      </View>
      
      <View style={styles.signButtons}>
        <TouchableOpacity onPress={() => setModalSignUpVisible(!isModalSignUpVisible)} style={styles.signupButton}>          
            <Text style={{color:'white',fontWeight:'bold'}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinButton}>          
            <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalContainer}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={isModalSignUpVisible}
          onRequestClose={() => {
            setModalSignUpVisible(!isModalSignUpVisible);
          }}
          >
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                
                <View style={styles.modalHeaderCloseButton}>
                    <Pressable
                      onPress={() => setModalSignUpVisible(!isModalSignUpVisible)}
                    >
                    <Text style={{fontSize:18}}>X</Text>
                  </Pressable>
                </View>
                <ScrollView>
                  <View >
                    <Text style={{fontSize:25,padding:20,fontWeight:'bold'}}>Sign Up</Text>
                    <Text style={{fontSize:14,paddingLeft:20,width:300}}>Create an account to save all your preferences. It's your login for this app.</Text>
                    
                    <View style={{ flex: 1,paddingTop:20,}}>
                        <SafeAreaView >
                          <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            keyboardType="default"
                            onChangeText={(text)=>{setFirstName(text);}}
                          />  
                          <LineSeparator />

                          <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            keyboardType="default"
                            onChangeText={(text)=>{setLastName(text)}}
                          />  
                          <LineSeparator />

                          <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={(text)=>{setEmail(text)}}
                          />  
                          <LineSeparator />

                          <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            keyboardType="default"
                            onChangeText={(text)=>{setPassword(text)}}
                          />  
                          <LineSeparator />

                          <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry={true}
                            keyboardType="default"
                            onChangeText={(text)=>{setConfirmPassword(text)}}
                          /> 
                          <LineSeparator />
                          <View style={styles.signButtons}>
                            <TouchableOpacity onPress={CompleteSignUp} style={styles.signupButton}>          
                                <Text style={{color:'white',fontWeight:'bold'}}>Complete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.signinButton}>          
                                <Text>Sign In</Text>
                            </TouchableOpacity>
                          </View>
                        </SafeAreaView>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
          </Modal>
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
  },
  modalContainer: {
    flex: 1,
    marginTop: 70,
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
  input: {
    height: 55,
    fontSize:22,
    fontWeight:'bold',
    margin: 5,
    padding: 10,
  },
  completeButton:{
    width:300,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: 'black',
    fontWeight:'bold',
  }
});

export default ProfileScreen;