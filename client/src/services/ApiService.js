import fetch from 'auth/FetchInterceptor'

const ApiService = {}

ApiService.login = async function (data) {
  return fetch({
    url: '/api/login/',
    method: 'post',
    data: data
  })
}

ApiService.loadProfile = async function (username) {
  return fetch({
    url: '/api/loadProfile',
    method: 'post',
    data: {
      username: username
    }
  })
}


export default ApiService
