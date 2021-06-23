import {SIDE_NAV_LIGHT, DIR_LTR, NAV_TYPE_TOP} from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'CMS';
export const API_BASE_URL = env.API_ENDPOINT_URL
export const APP_PREFIX_PATH = '';
export const AUTH_PREFIX_PATH = '/auth';

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_TOP,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR
};
