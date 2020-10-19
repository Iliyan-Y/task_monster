import React, { useState, useContext } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';

function EditTask({ route, navigation }) {
  const { taskTitle, taskDescription, taskId } = route.params;
  let { setTaskList, user } = useContext(TasksContext);
  let [title, setTitle] = useState(taskTitle);
  let [description, setDescription] = useState(taskDescription);
  let [expiryDay, setExpiryDay] = useState(0);
  let [expiryMonth, setExpiryMonth] = useState(0);
  let [expiryHour, setExpiryHour] = useState(0);

  let submit = () => {
    let body = {
      task: {
        title,
        description,
        expiryTime: {
          day: expiryDay,
          month: expiryMonth,
          hour: expiryHour,
        },
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
        <TextInput
          onChangeText={(e) => setExpiryDay(e)}
          placeholder="Day"
          name="Day"
        />
        <TextInput
          onChangeText={(e) => setExpiryMonth(e)}
          placeholder="Month"
          name="month"
        />
        <TextInput
          onChangeText={(e) => setExpiryHour(e)}
          placeholder="Hour"
          name="Hour"
        />
        <Button onPress={() => submit()} title="Save Changes" />
      </View>
    </View>
  );
}

export default EditTask;
