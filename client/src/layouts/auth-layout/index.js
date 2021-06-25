import React from 'react'
import {Route, Switch,} from "react-router-dom";
import AuthViews from 'views/auth-views'

export const AuthLayout = () => {
	return (
		<div className="auth-container">
			<Switch>
				<Route path="" component={AuthViews} />
			</Switch>
		</div>
	)
}


export default AuthLayout
