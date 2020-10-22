import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';

function LogIn({ navigation }) {
  let { user, setUser } = useContext(TasksContext);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  let submit = () => {
    let body = {
      user: {
        email,
        password,
      },
    };

    axios
      .post(railsServer + '/users/sign_in', body)
      .then((res) => {
        console.log(res.status);
        setUser({
          email: res.data.data.user.email,
          authentication_token: res.data.data.user.authentication_token,
        });
        navigation.navigate('Task List');
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Task Monster</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          onChangeText={(email) => setEmail(email)}
          placeholder="Email..."
          name="email"
          autoCorrect={true}
          autoCapitalize="none"
          autoCompleteType="email"
          placeholderTextColor="#003f5c"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password..."
          name="password"
          secureTextEntry={true}
          password={true}
          autoCapitalize="none"
          autoCompleteType="password"
          placeholderTextColor="#003f5c"
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => submit('Log In')}
      >
        <Text style={styles.inputText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate('Sign Up')}
      >
        <Text style={styles.inputText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },

  inputText: {
    height: 50,
    color: 'white',
    padding: 17,
  },

  forgot: {
    color: 'white',
    fontSize: 11,
  },

  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
});

export default LogIn;
