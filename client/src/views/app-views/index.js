import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
export const AppViews = () => {
  return (

    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/manage`} component={lazy(() => import(`./manage`))} />
        <Route path={`${APP_PREFIX_PATH}/courses`} component={lazy(() => import(`./courses`))} />
        <Route path={`${APP_PREFIX_PATH}/settings`} component={lazy(() => import(`./settings`))} />
        <Route path={`${APP_PREFIX_PATH}/explore`} component={lazy(() => import(`./explore`))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
