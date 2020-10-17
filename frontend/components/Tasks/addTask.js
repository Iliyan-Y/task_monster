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


function AddTask({
    navigation
}
){
  let {taskList, setTaskList, user} = useContext(TasksContext);
  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [completed, setCompleted] = useState(false);

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
    <View>
      <Text>Add a new Task!</Text>
      <View>
        <TextInput
          onChangeText={(title) => setTitle(title)}
          placeholder="title"
          name="title"
        />
        <TextInput
          onChangeText={(description) => setDescription(description)}
          placeholder="description"
          name="description"
        />
        <Button onPress={() => submit()} title="Add" />
      </View>
    </View>
  )
}
 
export default AddTask;
