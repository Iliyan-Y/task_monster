import axios from 'axios';
import { railsServer } from '../../serverAddress';
import moment from 'moment';

export function completeTask(user, taskId, setTaskList) {
  let body = {
    task: {
      completed: true,
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
      });
    })
    .catch((err) => console.log(err.message));
}

export let calculateExpTime = (userInput) => {
  let finalTime;
  let userDate = userInput.split('T')[0];
  let userTime = userInput.split('T')[1].split('.')[0];
  let userHour = userTime.split(':')[0];
  let expiryTime;

  if (userInput.month == 0 && userInput.day == 0) {
    return 0;
  }

  if (userHour == new Date().getHours()) {
    expiryTime = '23:59:59';
  } else {
    expiryTime = userTime;
  }

  let mo = moment('18:49:59', 'HH:mm:ss').fromNow();

  let date = moment().format('YYYY-MM-DD HH:mm:ss');

  //Getting the current date-time with required formate and UTC
  let expirydate = `${userDate} ${expiryTime}`;
  //difference of the expiry date-time given and current date-time
  let difference = moment.duration(moment(expirydate).diff(moment(date)));
  console.log(difference);
  let hours = parseInt(difference.asHours());
  let minutes = parseInt(difference.minutes());
  let seconds = parseInt(difference.seconds());
  finalTime = hours * 60 * 60 + minutes * 60 + seconds;

  return finalTime;
};
