import React, {Suspense} from "react";
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const PageRouter = ({ routes, from, to, align, cover }) => {
	const { url } = useRouteMatch();
	const loadingProps = {align, cover}
	return (
		<Suspense fallback={<Loading {...loadingProps}/>}>
      <Switch>
        {routes.map((route, idx) => (
          <Route key={idx} path={`${url}/${route.path}`} component={route.component} />
        ))}
        <Redirect from={from} to={to} />
      </Switch>

    </Suspense>
	)
}

export default PageRouter
