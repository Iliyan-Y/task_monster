import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';
// import { SwipeListView } from 'react-native-swipe-list-view';

function TaskList({ navigation }) {
  let { taskList, setTaskList } = useContext(TasksContext);
  let [displayTask, setDisplayTask] = useState([]);
  let [taskListView, setTaskListView] = useState([]);
    
  function addTask() {
    navigation.navigate('Add Task');
  }
    
  useEffect(() => {
      setDisplayTask(taskList)
      setTaskListView(
        taskList.map((task) => ({
          key: task.title,
          title: task.title,
          description: task.description,
          completed: task.completed,
        }))
      );
  }, [taskList]);
    console.log(taskListView)
  return (
    <View>
          <Text>Task list</Text>
          
       {/* {displayTask.map((task) => (
        <View key={task.title}>
          <Text>{task.title}</Text>
          <Text>{task.description}</Text>
        </View>
      ))} */}
              
             
      <Button onPress={() => addTask()} title="Add a new task" />
    </View>
  );
}

export default TaskList;
