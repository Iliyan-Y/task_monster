import React, { useState, useContext, useReducer } from 'react'
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
import { TasksContext } from '../../context'

function AddTask({ navigation }) {
  let { taskList, setTaskList, user } = useContext(TasksContext)
  let [title, setTitle] = useState('')
  let [description, setDescription] = useState('')
  let [completed, setCompleted] = useState(false)

  let submit = () => {
    let body = {
      task: {
        title,
        description,
        completed,
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
      .then((res) => {
        console.log(res.status)
      })
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
          onChangeText={(description) => setDescription(title)}
          placeholder="Description..."
          name="description"
          placeholderTextColor="#003f5c"
        />
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={() => submit('Add')}>
        <Text style={styles.inputText}>ADD</Text>
      </TouchableOpacity>
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

  addBtn: {
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
export default AddTask
