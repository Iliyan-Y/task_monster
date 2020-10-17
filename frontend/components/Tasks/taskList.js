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
  const [totalDuration, setTotalDuration] = useState(0);

  function addTask() {
    navigation.navigate('Add Task');
  }

  function completedTaskList() {
    navigation.navigate('Completed Task List');
  }

  let timerTime = (userTime) => {
    let year = new Date().getFullYear();
    var date = moment().utcOffset('+01:00').format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC
    var expirydate = `${year}-${userTime.month}-${userTime.day} 11:59:59`;
    //difference of the expiry date-time given and current date-time
    var difference = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(difference.asHours());
    var minutes = parseInt(difference.minutes());
    var seconds = parseInt(difference.seconds());
    var finalTime = hours * 60 * 60 + minutes * 60 + seconds;

    setTotalDuration(finalTime);
  };
  // Store
  useEffect(() => timerTime({ day: 17, month: 10 }), []);

  //add time param in the db
  useEffect(() => {
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
        data={taskListView.filter((task) => task.completed == false)}
        renderItem={(data, rowMap) => (
          <View style={styles.rowFront}>
            <Text>{data.item.title}</Text>
            <CountDown
              until={totalDuration}
              //duration of countdown in seconds
              timetoShow={('H', 'M', 'S')}
              //formate to show
              onFinish={() => alert('finished')}
              //on Finish call
              onPress={() => alert('hello')}
              //on Press call
              size={15}
            />
          </View>
        )}
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
