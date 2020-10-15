import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TasksContext } from '../../context';

function SignUp({
  navigation
}) {
  let { user, setUser } = useContext(TasksContext);
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [password_confirmation, setConfirmPassword] = useState('');

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
        console.log(res.status)
        setUser({ email: res.data.data.user.email, authentication_token: res.data.data.user.authentication_token })
      navigation.navigate('Add Task')})
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
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
        <TextInput
          placeholder="Confirm Password"
          name="confirmPassword"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
        />
        <Button onPress={() => submit()} title="Sign Up" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUp;
