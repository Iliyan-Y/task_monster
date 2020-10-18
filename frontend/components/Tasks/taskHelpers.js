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

export let calculateExpTime = (userTime) => {
  let finalTime;
  let hour = userTime.hour;
  let year = new Date().getFullYear();

  if (userTime.month == 0 && userTime.day == 0) {
    return 0;
  }

  if (hour == 0) {
    let currentHour = new Date().getHours();
    hour = 24 - currentHour;
    hour < 10 ? (hour = '0' + hour) : null;
  } else if (hour != 0 && hour.length < 2) {
    hour = '0' + hour;
  }

  let date = moment().utcOffset(-120).format('YYYY-MM-DD hh:mm:ss');
  //Getting the current date-time with required formate and UTC
  let expirydate = `${year}-${userTime.month}-${userTime.day} ${hour}:00:00`;
  //difference of the expiry date-time given and current date-time
  let difference = moment.duration(moment(expirydate).diff(moment(date)));
  let hours = parseInt(difference.asHours());
  let minutes = parseInt(difference.minutes());
  let seconds = parseInt(difference.seconds());
  finalTime = parseInt(hours + 2) * 60 * 60 + minutes * 60 + seconds;

  return finalTime;
};
