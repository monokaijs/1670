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

ApiService.updateAccount = async function (data) {
  return fetch({
    url: '/api/updateAccount',
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

ApiService.assignCourse = async function (data) {
  return fetch({
    url: '/api/assignCourse',
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

ApiService.updateInfo = async (data) => {
  return fetch({
    url: '/api/updateInfo',
    method: "POST",
    data: data
  })
}

ApiService.loadCategories = async (data) => {
  return fetch({
    url: '/api/loadCategories',
    method: "POST",
    data: data
  })
}

ApiService.loadCourseInfo = async (data) => {
  return fetch({
    url: '/api/loadCourseInfo',
    method: "POST",
    data: data
  })
}

ApiService.createActivityCourse = async (data) => {
  return fetch({
    url: '/api/createActivityCourse',
    method: "POST",
    data: data
  })
}

ApiService.deleteCourseActivity = async (data) => {
  return fetch({
    url: '/api/deleteCourseActivity',
    method: "POST",
    data: data
  })
}


ApiService.createMaterialCourse = async (data) => {
  return fetch({
    url: '/api/createMaterialCourse',
    method: "POST",
    data: data
  })
}

ApiService.changePassword = async (data) => {
  return fetch({
    url: '/api/changePassword',
    method: "POST",
    data: data
  })
}

ApiService.loadCourseActivities = async (data) => {
  return fetch({
    url: '/api/loadCourseActivities',
    method: "POST",
    data: data
  })
}

ApiService.loadAllCourses = async (data) => {
  return fetch({
    url: '/api/loadAllCourses',
    method: "POST",
    data: data
  })
}

ApiService.loadCourseMaterials = async (data) => {
  return fetch({
    url: '/api/loadCourseMaterials',
    method: "POST",
    data: data
  })
}


ApiService.deleteCourseMaterial = async (data) => {
  return fetch({
    url: '/api/deleteCourseMaterial',
    method: "POST",
    data: data
  })
}


export default ApiService
