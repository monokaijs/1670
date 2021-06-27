import React, {Component} from 'react'
import {FacebookOutlined, LockOutlined, UserOutlined} from '@ant-design/icons';
import {Menu} from 'antd';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';

const SettingOption = ({ match, location }) => {
  return (
    <Menu
      defaultSelectedKeys={`${match.url}/edit-profile`}
      mode="inline"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={`${match.url}/edit-profile`}>
        <UserOutlined />
        <span>Edit Profile</span>
        <Link to={'edit-profile'} />
      </Menu.Item>
      <Menu.Item key={`${match.url}/change-password`}>
        <LockOutlined />
        <span>Change Password</span>
        <Link to={'change-password'} />
      </Menu.Item>
    </Menu>
  );
};

const SettingContent = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/edit-profile`} component={EditProfile} />
      <Route path={`${match.url}/change-password`} component={ChangePassword} />
      <Redirect exact from={`${match.url}`} to={`${match.url}/edit-profile`} />
    </Switch>
  )
}

export class Setting extends Component {
  render() {
    return (
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption {...this.props}/>}
        mainContent={<SettingContent {...this.props}/>}
      />
    );
  }
}

export default Setting
