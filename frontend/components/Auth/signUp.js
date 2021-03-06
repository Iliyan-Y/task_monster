import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';

function SignUp({ navigation }) {
  let { setUser } = useContext(TasksContext);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [password_confirmation, setPasswordConfirmation] = useState('');

  let submit = () => {
    let body = {
      user: {
        email,
        password,
        password_confirmation,
      },
    };

    axios
      .post(railsServer + '/users', body)
      .then((res) => {
        console.log(res.status);
        setUser({
          email: res.data.data.user.email,
          authentication_token: res.data.data.user.authentication_token,
        });
        navigation.navigate('Add Task');
      })
      .catch((err) =>
        alert(
          'This email is registered or the password is less than 6 characters' +
            '\nError : ' +
            err.message
        )
      );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>Get organised with Task Monster!</Text>
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            onChangeText={(passwordConfirmation) =>
              setPasswordConfirmation(passwordConfirmation)
            }
            placeholder="Password confirmation..."
            name="passwordConfirmation"
            secureTextEntry={true}
            password={true}
            autoCapitalize="none"
            placeholderTextColor="#003f5c"
          />
        </View>

        <TouchableOpacity
          style={styles.signupBtn}
          onPress={() => submit('Sign Up')}
        >
          <Text style={styles.inputText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
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
    width: 300,
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'center',
  },

  inputText: {
    height: 50,
    color: 'white',
    padding: 17,
  },

  signupBtn: {
    width: 300,
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fb5b5a',
    marginBottom: 40,
  },
});

export default SignUp;
