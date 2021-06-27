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
  return  fetch({
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

ApiService.deleteAccount = async (data) => {
  return fetch({
    url: '/api/deleteAccount',
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

ApiService.updateCourse = async function (data) {
  return fetch({
    url: '/api/updateCourse',
    method: "POST",
    data: data
  })
}

ApiService.deleteCourse = async (data) => {
  return fetch({
    url: '/api/deleteCourse',
    method: "POST",
    data: data
  })
}



ApiService.loadConfig = async (data) => {
  return fetch({
    url: '/api/loadConfig',
    method: "POST",
    data: data
  })
}

ApiService.updateRole = async (data) => {
   return fetch({
    url: '/api/updateRole',
    method: "POST",
    data: data
  })
}

ApiService.createRole = async (data) => {
  return fetch({
    url: '/api/createRole',
    method: "POST",
    data: data
  })
}

ApiService.deleteRole = async (data) => {
  return fetch({
    url: '/api/deleteRole',
    method: "POST",
    data: data
  })
}

ApiService.updateEduLevel = async (data) => {
  return fetch({
    url: '/api/updateEduLevel',
    method: "POST",
    data: data
  })
}

ApiService.createEduLevel = async (data) => {
  return fetch({
    url: '/api/createEduLevel',
    method: "POST",
    data: data
  })
}

ApiService.deleteEduLevel = async (data) => {
  return fetch({
    url: '/api/deleteEduLevel',
    method: "POST",
    data: data
  })
}

ApiService.updateInformation = async (data) => {
  return fetch({
    url: '/api/updateInformation',
    method: "POST",
    data: data
  })
}


ApiService.updateCategory = async (data) => {
  return fetch({
    url: '/api/updateCategory',
    method: "POST",
    data: data
  })
}

ApiService.createCategory = async (data) => {
  return fetch({
    url: '/api/createCategory',
    method: "POST",
    data: data
  })
}

ApiService.deleteCategory = async (data) => {
  return fetch({
    url: '/api/deleteCategory',
    method: "POST",
    data: data
  })
}

ApiService.loadMyCourses = async (data) => {
  return fetch({
    url: '/api/loadMyCourses',
    method: "POST",
    data: data
  })
}


export default ApiService
