import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TasksContext } from '../../context';
import { SwipeListView } from 'react-native-swipe-list-view';
import CompletedButton from './completeTaskButton';
import DeleteButton from './deleteTaskButton';
import CountDown from 'react-native-countdown-component';

import { completeTask, calculateExpTime } from './taskHelpers';

function TaskList({ navigation }) {
  let { taskList, setTaskList, user } = useContext(TasksContext);
  let [taskListView, setTaskListView] = useState([]);

  function addTask() {
    navigation.navigate('Add Task');
  }

  function completedTaskList() {
    navigation.navigate('Completed Task List');
  }

  //add time param in the db
  useEffect(() => {
    setTaskListView(
      taskList.map((task) => ({
        key: task.title,
        id: task._id.$oid,
        title: task.title,
        description: task.description,
        completed: task.completed,
        expiryTime: calculateExpTime(task.expiryTime),
      }))
    );
  }, [taskList]);
  return (
    <View>
      <Text>Task list</Text>
      <SwipeListView
        data={taskListView.filter((task) => task.completed == false)}
        renderItem={(data, rowMap) =>
          data.item.expiryTime == 0 ? (
            <View style={styles.rowFront}>
              <Text>{data.item.title}</Text>
            </View>
          ) : (
            <View style={styles.rowFront}>
              <Text>
                {data.item.title}
                <CountDown
                  //duration of countdown in seconds
                  until={data.item.expiryTime}
                  //formate to show
                  timetoShow={('H', 'M', 'S')}
                  onFinish={() => completeTask(user, data.item.id, setTaskList)}
                  size={12}
                />
              </Text>
            </View>
          )
        }
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backLeftBtn]}>
              <CompletedButton
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
      <Button onPress={() => addTask()} title="Add a new task" />
      <Button onPress={() => completedTaskList()} title="Completed Tasks" />
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

export default TaskList;
