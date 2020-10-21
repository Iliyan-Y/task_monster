import axios from 'axios';
import { railsServer } from '../../serverAddress';
import moment from 'moment';

export function completeTask(
  user,
  taskId,
  taskList,
  setTaskList,
  completed = true,
  points = 1,
  setScore
) {
  let body = {
    task: {
      completed: completed,
      score: points,
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
    .then(() => {
      axios.get(railsServer + '/tasks', headers).then((res) => {
        setTaskList(res.data);
        let scoreArray = res.data.map((task) => task.score);
        setScore(scoreArray.reduce((a, b) => a + b, 0));
      });
    })
    .catch((err) => console.log(err.message));
}

export let calculateExpTime = (userInput) => {
  if (userInput == 0) {
    return 0;
  }
  let finalTime;
  let userDate = userInput.split('T')[0];
  let userTime = userInput.split('T')[1].split('.')[0];
  let userHour = parseInt(userTime.split(':')[0]) + 1;
  let userMins = parseInt(userTime.split(':')[1]);
  let localMin = new Date().getMinutes();
  let timeOffset = 0;

  let expiryTime;

  if (userHour == new Date().getHours() && userMins - localMin > 3) {
    expiryTime = userTime;
    timeOffset = 1;
  } else if (userHour != new Date().getHours()) {
    expiryTime = userTime;
    timeOffset = 1;
  } else {
    expiryTime = '23:59:59';
  }

  let date = moment().format('YYYY-MM-DD HH:mm:ss');

  //Getting the current date-time with required formate and UTC
  let expirydate = `${userDate} ${expiryTime}`;
  //difference of the expiry date-time given and current date-time
  let difference = moment.duration(moment(expirydate).diff(moment(date)));

  let hours = parseInt(difference.asHours());
  let minutes = parseInt(difference.minutes());
  let seconds = parseInt(difference.seconds());
  finalTime = (hours + timeOffset) * 60 * 60 + minutes * 60 + seconds;

  return finalTime;
};
