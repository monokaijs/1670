import fetch from 'auth/FetchInterceptor'

const apiService = {}

apiService.getPost = function (params) {
  return fetch({
    url: '/posts/1',
    method: 'get',
    params
  })
}

apiService.setPost = function (data) {
  return fetch({
    url: '/posts',
    method: 'post',
    data: data
  })
}

export default apiService
