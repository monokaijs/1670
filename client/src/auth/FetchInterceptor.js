import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { notification } from 'antd';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

// Config
const ENTRY_ROUTE = '/api/login'
const TOKEN_PAYLOAD_KEY = 'x-access-token'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN)
  if (jwtToken) {
    config.headers[TOKEN_PAYLOAD_KEY] = jwtToken
  }

  config.headers['Content-Type'] = "application/json";

  return config;
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

// API response interceptor
service.interceptors.response.use( (response) => {
	return response.data;
}, (error) => {

	let notificationParam = {
		message: ''
	}
	if (error.response) {
		// Remove token and redirect
		if (error.response.status === 400 || error.response.status === 403) {
			notificationParam.message = 'Authentication Fail'
			notificationParam.description = 'Please login again'
			localStorage.removeItem(AUTH_TOKEN)
			history.push(ENTRY_ROUTE)
			window.location.reload();
		}

		if (error.response.status === 404) {
			notificationParam.message = 'Not Found'
		}

		if (error.response.status === 500) {
			notificationParam.message = 'Internal Server Error'
		}

		if (error.response.status === 508) {
			notificationParam.message = 'Time Out'
		}

		notification.error(notificationParam)
	}

	return Promise.reject(error);
});

export default service
