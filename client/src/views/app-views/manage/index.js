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
import ManageSystem from "./manage-system";
import ManageInformation from "./manage-system/manage-information";
import ManageEduLevel from "./manage-system/manage-edu-level";
import ManageRole from "./manage-system/manage-role";

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

      <Menu.SubMenu
        key="manage-system"
        title={
          <span>
            <UserOutlined/>
            Manage System
          </span>
        }
      >
        <Menu.Item key={`${match.url}/manager-information`}>
          <PlusSquareOutlined/>
          <span>Manage Information</span>
          <Link to={'manage-information'}/>
        </Menu.Item>
        <Menu.Item key={`${match.url}/manage-role`}>
          <UnorderedListOutlined/>
          <span>Manage Role</span>
          <Link to={'manage-role'}/>
        </Menu.Item>
        <Menu.Item key={`${match.url}/manage-edu-level`}>
          <UnorderedListOutlined/>
          <span>Manage EduLevel</span>
          <Link to={'manage-edu-level'}/>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

const SettingContent = ({match}) => {
  return (
    <Switch>
      <Route path={`${match.url}/manage-accounts`} component={ManageAccounts}/>
      <Route path={`${match.url}/manage-courses`} component={ManageCourses}/>
      <Route path={`${match.url}/manage-information`} component={ManageInformation}/>
      <Route path={`${match.url}/manage-role`} component={ManageRole}/>
      <Route path={`${match.url}/manage-edu-level`} component={ManageEduLevel}/>
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
