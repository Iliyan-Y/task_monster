import React, { useState, useContext, useReducer } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';

function EditTask({ route, navigation }) {
  const { taskTitle, taskDescription, taskId } = route.params;
  let { taskList, setTaskList, user } = useContext(TasksContext);
  let [title, setTitle] = useState(taskTitle);
  let [description, setDescription] = useState(taskDescription);

  let submit = () => {
    let body = {
      task: {
        title,
        description,
      },
    };
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    };

    axios
      .patch(railsServer + '/tasks/' + taskId, body, headers)
      .then((res) => {
        console.log(res.status);
      })
      .then(() => {
        axios.get(railsServer + '/tasks', headers).then((res) => {
          setTaskList(res.data);
          navigation.navigate('Task List');
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View>
      <Text>Edit Task!</Text>
      <View>
        <TextInput
          onChangeText={(title) => setTitle(title)}
          defaultValue={taskTitle}
          name="title"
        />
        <TextInput
          onChangeText={(description) => setDescription(description)}
          defaultValue={taskDescription}
          name="description"
        />
        <Button onPress={() => submit()} title="Save Changes" />
      </View>
    </View>
  );
}

export default EditTask;
