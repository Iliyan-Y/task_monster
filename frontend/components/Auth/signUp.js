import React, { useState, useContext } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { railsServer } from '../../serverAddress'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { TasksContext } from '../../context'

function SignUp({ navigation }) {
  let { user, setUser } = useContext(TasksContext)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [password_confirmation, setPasswordConfirmation] = useState('')

  let submit = () => {
    let body = {
      user: {
        email,
        password,
        password_confirmation,
      },
    }

    axios
      .post(railsServer + '/users', body)
      .then((res) => {
        console.log(res.status)
        setUser({
          email: res.data.data.user.email,
          authentication_token: res.data.data.user.authentication_token,
        })
        navigation.navigate('Add Task')
      })
      .catch((err) => console.log(err.message))
  }

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
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password..."
            name="password"
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
  )
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

  signupBtn: {
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
    fontSize: 20,
    color: '#fb5b5a',
    marginBottom: 40,
  },
})

export default SignUp
