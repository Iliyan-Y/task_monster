import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TasksContext } from '../../context';
import { SwipeListView } from 'react-native-swipe-list-view';
import CompletedButton from './completeTaskButton';
import DeleteButton from './deleteTaskButton';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

function TaskList({ navigation }) {
  let { taskList, setTaskList, user } = useContext(TasksContext);
  let [taskListView, setTaskListView] = useState([]);

  function addTask() {
    navigation.navigate('Add Task');
  }

  function completedTaskList() {
    navigation.navigate('Completed Task List');
  }

  let calculateExpTime = (userTime) => {
    let finalTime;
    let hour = userTime.hour;
    if (userTime.month == 0 && userTime.day == 0) {
      return 0;
    }
    if (hour == 0) {
      let currentHour = new Date().getHours();
      hour = 24 - currentHour;
    }
    console.log(hour);
    let year = new Date().getFullYear();
    let date = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC
    let expirydate = `${year}-${userTime.month}-${userTime.day} ${hour}:59:59`;
    //difference of the expiry date-time given and current date-time
    let difference = moment.duration(moment(expirydate).diff(moment(date)));
    let hours = parseInt(difference.asHours());
    let minutes = parseInt(difference.minutes());
    let seconds = parseInt(difference.seconds());
    finalTime = hours * 60 * 60 + minutes * 60 + seconds;

    return finalTime;
  };

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
                  onFinish={() => alert('finished')}
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
