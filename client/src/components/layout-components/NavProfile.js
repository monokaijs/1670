import React from "react";
import {Avatar, Dropdown, Menu} from "antd";
import {connect, useDispatch, useSelector} from 'react-redux'
import {LogoutOutlined, QuestionCircleOutlined, SettingOutlined} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import {signOut, signOutSuccess} from 'redux/actions/Auth';

const menuItem = [
  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/"
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/"
  }
]

export const NavProfile = (props) => {
  const profileImg = "/img/avatars/thumb-1.jpg";
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg}/>
          <div className="pl-3">
            <h4 className="mb-0">{userInfo.fullName}</h4>
            <span className="text-muted">User</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon}/>
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => {
            dispatch(signOutSuccess());
          }}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={profileImg}/>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
