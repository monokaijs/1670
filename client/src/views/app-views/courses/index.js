import React, {lazy, Suspense} from 'react';
import {Switch, Route} from "react-router-dom";

const Course = ({match}) => {
  return(
    <Suspense>
      <Switch>
        <Route path={`${match.url}/course-list`} component={lazy(() => import(`./course-list`))} />
        <Route path={`${match.url}/my-course`} component={lazy(() => import(`./my-course`))} />
      </Switch>
    </Suspense>
  )
}
export default Course