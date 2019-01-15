import axios from 'axios'

export default {
  login (request = {}) {
    return axios.post('http://101.200.72.142:8090/v1/users/login', request)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error))
  }
}
