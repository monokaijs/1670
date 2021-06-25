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

ApiService.createAccount = async function (data) {
  return fetch({
    url: '/api/createAccount',
    method: "POST",
    data: data
  })
}

ApiService.loadAccounts = async function (data) {
  return fetch({
    url: '/api/loadAccounts',
    method: "POST",
    data: data
  })
}

ApiService.createCourse = async function (data) {
  return fetch({
    url: '/api/createCourse',
    method: "POST",
    data: data
  })
}

ApiService.loadCourses = async function (data) {
  return fetch({
    url: '/api/loadCourses',
    method: "POST",
    data: data
  })
}


export default ApiService
