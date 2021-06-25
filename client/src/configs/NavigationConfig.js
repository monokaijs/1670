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
  path: `${APP_PREFIX_PATH}/courses`,
  title: 'courses',
  icon: BookOutlined,
  breadcrumb: false,
  submenu: [{
    key: 'course.list',
    path: `${APP_PREFIX_PATH}/courses/course-list`,
    title: 'course.list',
    icon: FileDoneOutlined,
    breadcrumb: false,
    submenu: []
  },
    {
      key: 'my.course',
      path: `${APP_PREFIX_PATH}/courses/my-course`,
      title: 'my.course',
      icon: FileDoneOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}, {
  key: 'community',
  path: `${APP_PREFIX_PATH}/community`,
  title: 'community',
  icon: SmileOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
