import React, { useState, useContext } from 'react'
import { StyleSheet, View, TextInput, Text, Button } from 'react-native'
import axios from 'axios'
import { railsServer } from '../../serverAddress'
import { TasksContext } from '../../context'

function LogIn({ navigation }) {
  let { user, setUser } = useContext(TasksContext)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let submit = () => {
    let body = {
      user: {
        email,
        password,
      },
    }

    axios
      .post(railsServer + '/users/sign_in', body)
      .then((res) => {
        console.log(res.status)
        setUser({
          email: res.data.data.user.email,
          authentication_token: res.data.data.user.authentication_token,
        })
        navigation.navigate('Task List')
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <View style={styles.container}>
      <Text>Log In</Text>
      <View>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          placeholder="email"
          name="email"
        />
        <TextInput
          onChangeText={(password) => setPassword(password)}
          placeholder="password"
          name="password"
        />

        <Button onPress={() => submit()} title="Log In" />
        <Button
          onPress={() => navigation.navigate('Sign Up')}
          title="Sign Up"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LogIn
