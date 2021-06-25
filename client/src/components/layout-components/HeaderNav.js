import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {Button, Layout, Menu} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined} from '@ant-design/icons';
import Logo from './Logo';
import NavSearch from './NavSearch';
import {onMobileNavToggle, toggleCollapsedNav} from 'redux/actions/Theme';
import {NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH} from 'constants/ThemeConstant';
import utils from 'utils'
import {NavProfile} from "./NavProfile";

const {Header} = Layout;

export const HeaderNav = props => {
  const {
    navCollapsed,
    mobileNav,
    navType,
    headerNavColor,
    toggleCollapsedNav,
    onMobileNavToggle,
    isMobile,
    currentTheme,
    direction
  } = props;
  const [searchActive, setSearchActive] = useState(false);
  const {userInfo, isLoggedIn} = useSelector(state => state.auth);

  const onSearchClose = () => {
    setSearchActive(false)
  }

  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  const isNavTop = navType === NAV_TYPE_TOP
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff')
    }
    return utils.getColorContrast(headerNavColor)
  }
  const navMode = mode()
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return '0px'
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`
    } else {
      return `${SIDE_NAV_WIDTH}px`
    }
  }

  useEffect(() => {
    if (!isMobile) {
      onSearchClose()
    }
  })

  return (
    <Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <Logo logoType={navMode}/>
        <div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              {
                isNavTop && !isMobile ?
                  null
                  :
                  <li className="ant-menu-item ant-menu-item-only-child" onClick={() => {
                    onToggle()
                  }}>
                    {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon"/> :
                      <MenuFoldOutlined className="nav-icon"/>}
                  </li>
              }
            </ul>
          </div>
          <div className="nav-right">
            {/*<NavPanel direction={direction} />*/}
            {isLoggedIn ? (
              <>
                <Menu mode="horizontal">
                  <Menu.Item>
                    {['admin'].includes(userInfo.role) && (
                      <a href="/manage">
                        <SettingOutlined className="nav-icon mr-0"/>
                      </a>
                    )}
                  </Menu.Item>
                </Menu>
                <NavProfile/>
              </>
            ): (
              <Menu mode="horizontal">
                <Menu.Item>
                  <Button href="/auth/login">Sign In</Button>
                </Menu.Item>
              </Menu>
            )}
          </div>
          <NavSearch active={searchActive} close={onSearchClose}/>
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = ({theme}) => {
  const {navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction} = theme;
  return {navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction}
};

export default connect(mapStateToProps, {toggleCollapsedNav, onMobileNavToggle})(HeaderNav);
