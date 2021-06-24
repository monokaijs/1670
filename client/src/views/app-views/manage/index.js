import React from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import InnerAppLayout from 'layouts/inner-app-layout';
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import ManageAccounts from "./manage-accounts";
import ManageCourses from "./manage-courses";
import {Menu} from "antd";
import {
  GroupOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
  WarningOutlined
} from '@ant-design/icons';
import ErrorOne from "../../auth-views/errors/error-page-1";

const SettingOption = ({match, location}) => {
  return (
    <Menu
      defaultSelectedKeys={`${match.url}/manage-accounts`}
      mode="inline"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={`${match.url}/manage-accounts`}>
        <TeamOutlined/>
        <span>Manage Accounts</span>
        <Link to={'manage-accounts'}/>
      </Menu.Item>

      <Menu.Item key={`${match.url}/manage-courses`}>
        <WarningOutlined/>
        <span>Manage Courses</span>
        <Link to={'manage-courses'}/>
      </Menu.Item>
    </Menu>
  );
};

const SettingContent = ({match}) => {
  return (
    <Switch>
      <Route path={`${match.url}/manage-accounts`} component={ManageAccounts}/>
      <Route path={`${match.url}/manage-courses`} component={ManageCourses}/>
      <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/manage/manage-accounts`}/>
    </Switch>
  )
}

const Manage = (props) => {
  const {userInfo} = useSelector(state => state.auth);
  return (
    <div>
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption {...props}/>}
        mainContent={<SettingContent {...props}/>}
      />
    </div>
  );
}


export default Manage
