import {API_BASE_URL} from "../configs/AppConfig";

const ApiService = {}

ApiService.login = async function (data) {
  return fetch(API_BASE_URL + '/api/login', {
    method: 'post',
    body: JSON.stringify(data)
  })
}

ApiService.signup = async function (data) {
  return fetch(API_BASE_URL + '/api/signup', {
    method: 'post',
    body: JSON.stringify(data)
  })
}

export default ApiService
