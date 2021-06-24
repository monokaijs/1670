import React, {Suspense, useEffect, useState} from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from 'antd';
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import Loading from "../components/shared-components/Loading";
import Utils from "../utils";
import ApiService from "../services/ApiService";
import {AUTH_TOKEN} from "../redux/constants/Auth";
import {authenticated, setUserInfo} from "../redux/actions/Auth";

const authToken = localStorage.getItem(AUTH_TOKEN);
const profileLoader = {
  user: authToken ? Utils.wrapPromise(ApiService.loadProfile("me")) : Utils.wrapPromise(new Promise(_ => _()))
}

function ProfileLoader() {
  // Try to read user info, although it might not have loaded yet
  const dispatch = useDispatch();
  const user = profileLoader.user.read();
  useEffect(() => {
    if (authToken) {
      dispatch(authenticated(authToken, user));
    }
  }, []);
  return <></>;
}

export const Views = (props) => {
  const {locale, location, direction} = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Suspense fallback={<Loading cover="content"/>}>
          <ProfileLoader/>
          <Switch>
            <Route exact path="/">
              <Redirect to={"/home"}/>
            </Route>
            <Route path={AUTH_PREFIX_PATH}>
              <AuthLayout direction={direction}/>
            </Route>
            <Route path={APP_PREFIX_PATH}>
              <AppLayout direction={direction} location={location}/>
            </Route>
          </Switch>
        </Suspense>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({theme, auth}) => {
  const {locale, direction} = theme;
  const {token} = auth;
  return {locale, token, direction}
};

export default withRouter(connect(mapStateToProps)(Views));
