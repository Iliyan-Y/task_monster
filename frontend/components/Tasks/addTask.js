import React, { useState, useContext } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Text,
} from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';
import DatePicker from './datePicker';


function AddTask({ navigation }) {
  let { setTaskList, user } = useContext(TasksContext)
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [expiryTime, setExpiryTime] = useState(0)

  let submit = () => {
    let body = {
      task: {
        title,
        description,
        completed: false,
        score: 0,
        expiryTime,
      },
    }
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    }

    axios
      .post(railsServer + '/tasks', body, headers)
      .then(() => {
        axios.get(railsServer + '/tasks', headers).then((res) => {
          setTaskList(res.data)
          navigation.navigate('Task List')
        })
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>What is your task for today?</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          onChangeText={(title) => setTitle(title)}
          placeholder="Title..."
          name="title"
          placeholderTextColor="#003f5c"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          onChangeText={(description) => setDescription(description)}
          placeholder="Description..."
          name="description"
          placeholderTextColor="#003f5c"
        />
      </View>

      <DatePicker setExpiryTime={setExpiryTime} textColor="white" />

      <TouchableOpacity style={styles.addBtn} onPress={() => submit()}>
        <Text style={styles.inputText}>ADD</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },

  inputView: {
    width: '80%',
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

  addBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    top: 460,
    left: 45,
  },

  logo: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fb5b5a',
    marginBottom: 40,
    alignSelf: 'center',
  },
})
export default AddTask
