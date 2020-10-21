import React from 'react';
import { StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { railsServer } from '../../serverAddress';
const DeleteButton = ({ taskId, user, setTaskList }) => {
  function deleteTask() {
    
    let headers = {
      headers: {
        email: user.email,
        authentication_token: user.authentication_token,
      },
    };
    axios
      .delete(railsServer + '/tasks/' + taskId, headers)
      .then((res) => {
        console.log(res.status);
      })
      .then(() => {
        axios.get(railsServer + '/tasks', headers).then((res) => {
          setTaskList(res.data);
        });
      })
      .catch((err) => console.log(err.message));
  }
  return (
    <Button
      style={
        (styles.backTextWhite, styles.backRightBtn, styles.backRightBtnRight)
      }
      onPress={() => deleteTask()}
      title="Delete"
    />
  );
};
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

export default DeleteButton;
