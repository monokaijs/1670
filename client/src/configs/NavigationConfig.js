import {
  HomeOutlined,
  BookOutlined,
  SmileOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'home',
  icon: HomeOutlined,
  breadcrumb: false,
  submenu: []
}, {
  key: 'courses',
  path: `${APP_PREFIX_PATH}/courses/list`,
  title: 'courses',
  icon: BookOutlined,
  breadcrumb: false,
  submenu: []
}, {
  key: 'explore',
  path: `${APP_PREFIX_PATH}/explore`,
  title: 'explore',
  icon: SmileOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
