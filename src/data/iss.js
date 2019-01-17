import axios from 'axios';

export const getPosition = () => {
  return axios.get('http://api.open-notify.org/iss-now.json')
    .then(res => res.data.iss_position
    )
    .catch(e => {
      console.log(e);
    });
}
