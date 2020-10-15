import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';


function TaskList ({
    navigation
}
) {
    let {taskList, setTaskList} = useContext(TasksContext);
    let [displayTask, setDisplayTask] = useState([]);
function addTask(){
    navigation.navigate('Add Task')
}
useEffect(()=>{
    setDisplayTask(taskList)
}, [taskList])
    return ( 
        <View>
        <Text>Task list</Text>
            {displayTask.map(task => 
            <View key={task.name}>
                <Text>{task.title}</Text> 
            <Text>{task.description}</Text>
            </View>
            )}
         <Button onPress={() => addTask()} title="Add a new task" /> 
        
        </View>
     );
}
 
export default TaskList;