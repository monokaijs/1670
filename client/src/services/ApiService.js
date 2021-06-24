import fetch from 'auth/FetchInterceptor'

const ApiService = {}

ApiService.login = async function (data) {
  return fetch({
    url: '/api/login/',
    method: 'post',
    data: data
  })
}

ApiService.loadProfile = async function (userId) {
  return fetch({
    url: '/api/loadProfile',
    method: 'post',
    data: {
      userId: userId
    }
  })
}


export default ApiService
