import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
import { TasksContext } from '../../context';
import { SwipeListView } from 'react-native-swipe-list-view';
import UncompletedButton from './uncompleteTaskButton';
import DeleteButton from './deleteTaskButton';

function CompletedTaskList({ navigation }) {
  let { taskList, setTaskList, user } = useContext(TasksContext);
  let [displayTask, setDisplayTask] = useState([]);
  let [taskListView, setTaskListView] = useState([]);


  useEffect(() => {
    setDisplayTask(taskList);
    setTaskListView(
      taskList.map((task) => ({
        key: task.title,
        id: task._id.$oid,
        title: task.title,
        description: task.description,
        completed: task.completed,
      }))
    );
  }, [taskList]);
  return (
    <View>
      <Text>Task list</Text>
      <SwipeListView
        data={taskListView.filter((task) => task.completed == true)}
        renderItem={(data, rowMap) => (
          <View style={styles.rowFront}>
            <Text>{data.item.title}</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backLeftBtn]}>
              <UncompletedButton
                user={user}
                taskId={data.item.id}
                setTaskList={setTaskList}
              />
            </View>
            <View
              style={[
                styles.backTextWhite,
                styles.backRightBtn,
                styles.backRightBtnLeft,
              ]}
            >
              <Button
                style={
                  (styles.backTextWhite,
                  styles.backRightBtn,
                  styles.backRightBtnLeft)
                }
                onPress={() =>
                  navigation.navigate('Edit Task', {
                    taskTitle: data.item.title,
                    taskDescription: data.item.description,
                    taskId: data.item.id,
                  })
                }
                title="Edit"
              />
            </View>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
              <DeleteButton
                user={user}
                taskId={data.item.id}
                setTaskList={setTaskList}
              />
            </View>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-150}
      />
      <Button onPress={() => navigation.navigate('Task List')} title="Uncompleted Tasks" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backLeftBtn: {
    backgroundColor: 'green',
    left: 0,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default CompletedTaskList;
