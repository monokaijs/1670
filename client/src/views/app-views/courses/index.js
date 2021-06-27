import React, {lazy, Suspense} from 'react';
import {Switch, Route} from "react-router-dom";
import Loading from "../../../components/shared-components/Loading";

const Course = ({match}) => {
  return(
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${match.url}/list`} component={lazy(() => import(`./course-list`))} />
        <Route path={`${match.url}/:courseId`} component={lazy(() => import(`./course-detail`))} />
      </Switch>
    </Suspense>
  )
}
export default Course
