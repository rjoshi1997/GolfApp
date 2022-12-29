import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useState } from "react";
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
  Alert,
} from "react-native";

const LineSeparator = () => {
  return (
    <View
      style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10 }}
    />
  );
};

const CreateAccountScreen = (props) => {
  const [isModalSignUpVisible, setModalSignUpVisible] = useState(false);
  const [isModalSignInVisible, setModalSignInVisible] = useState(false);
  let [firstName, setFirstName] = useState(null);
  let [lastName, setLastName] = useState(null);
  let [email, setEmail] = useState(null);
  let [passowrd, setPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState(null);
  let [validate, setValidate] = useState(true);

  let [loginEmail, setLoginEmail] = useState(null);
  let [loginPassowrd, setLoginPassword] = useState(null);

  const CompleteSignUp = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: passowrd,
            username: firstName + "_" + lastName,
          }),
          method: "POST",
        }
      );
      Alert.alert(
        "Thanks For Signing Up",
        "We will keep you posted on the latest news.",
        [
          {
            text: "OK",
            onPress: () => setModalSignUpVisible(!isModalSignUpVisible),
          },
        ]
      );
    } catch (error) {
      console.error(error);
    }
  };

  const CompleteSignIn = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetch("http://localhost:1337/api/auth/local/", {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },  
        body: JSON.stringify({
          identifier: loginEmail,
          password: loginPassowrd,
        }),
        method: "POST",
      });
      const loginResponseData = await responseData.json();
      console.log(loginResponseData.user)
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.titleText}>Profile</Text>
      <View
        style={{ height: 0.3, backgroundColor: "grey", marginHorizontal: 10 }}
      />

      <View>
        <Text style={styles.createAccount}>Create Account</Text>
        <Text style={styles.createAccountDetails}>
          Create an account to save all your preferences. It's your login for
          this app.
        </Text>
      </View>

      <View style={styles.signButtons}>
        <TouchableOpacity
          onPress={() => setModalSignUpVisible(!isModalSignUpVisible)}
          style={styles.signupButton}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalSignInVisible(!isModalSignInVisible)}
          style={styles.signinButton}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalContainer}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalSignUpVisible}
          onRequestClose={() => {
            setModalSignUpVisible(!isModalSignUpVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalHeaderCloseButton}>
                <TouchableOpacity
                  onPress={() => setModalSignUpVisible(!isModalSignUpVisible)}
                >
                  <Text style={{ fontSize: 18 }}>X</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View>
                  <Text
                    style={{ fontSize: 25, padding: 20, fontWeight: "bold" }}
                  >
                    Sign Up
                  </Text>
                  <Text style={{ fontSize: 14, paddingLeft: 20, width: 300 }}>
                    Create an account to save all your preferences. It's your
                    login for this app.
                  </Text>

                  <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView>
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        keyboardType="default"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                          setFirstName(text);
                        }}
                      />
                      <LineSeparator />

                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        keyboardType="default"
                        autoCapitalize="none"
                        onChangeText={(text) => {
                          setLastName(text);
                        }}
                      />
                      <LineSeparator />

                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                          setEmail(text);
                        }}
                      />
                      <LineSeparator />

                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        keyboardType="default"
                        onChangeText={(text) => {
                          setPassword(text);
                        }}
                      />
                      <LineSeparator />

                      <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        keyboardType="default"
                        onChangeText={(text) => {
                          setConfirmPassword(text);
                        }}
                      />
                      <LineSeparator />
                      <View style={styles.signButtons}>
                        <TouchableOpacity
                          onPress={CompleteSignUp}
                          style={styles.signupButton}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Complete
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            setModalSignUpVisible(!isModalSignUpVisible);
                          }}
                          style={styles.signinButton}
                        >
                          <Text>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Sign In Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalSignInVisible}
          onRequestClose={() => {
            setModalSignInVisible(!isModalSignInVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View style={styles.modalHeaderCloseButton}>
                <TouchableOpacity
                  onPress={() => setModalSignInVisible(!isModalSignInVisible)}
                >
                  <Text style={{ fontSize: 18 }}>X</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View>
                  <Text
                    style={{ fontSize: 25, padding: 20, fontWeight: "bold" }}
                  >
                    Sign Up
                  </Text>
                </View>
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <SafeAreaView>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={(text) => {
                        setLoginEmail(text);
                      }}
                    />
                    <LineSeparator />

                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      autoCapitalize="none"
                      secureTextEntry={true}
                      keyboardType="default"
                      onChangeText={(text) => {
                        setLoginPassword(text);
                      }}
                    />
                    <LineSeparator />

                    <View style={styles.signButtons}>
                      <TouchableOpacity
                        onPress={CompleteSignIn}
                        style={styles.signupButton}
                      >
                        <Text style={{ color: "white", fontWeight: "bold" }}>
                          Sign In
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setModalSignInVisible(!isModalSignInVisible);
                        }}
                        style={styles.signinButton}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  titleText: {
    padding: 10,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  createAccount: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
  },
  createAccountDetails: {
    fontSize: 15,
    paddingLeft: 20,
    paddingRight: 10,
  },
  signButtons: {
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontSize: 14,
  },
  signupButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "black",
    fontWeight: "bold",
  },
  signinButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "white",
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    marginTop: 70,
  },
  modalView: {
    flex: 1,
    height: 600,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 0,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeaderCloseButton: {
    alignItems: "flex-end",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    height: 55,
    fontSize: 22,
    fontWeight: "bold",
    margin: 5,
    padding: 10,
  },
  completeButton: {
    width: 300,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 50,
    backgroundColor: "black",
    fontWeight: "bold",
  },
});

export default CreateAccountScreen;
