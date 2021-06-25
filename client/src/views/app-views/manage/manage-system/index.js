import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {APP_PREFIX_PATH} from "../../../../configs/AppConfig";
import ManageInformation from "./manage-information";
import ManageEduLevel from "./manage-edu-level";

const ManageSystem = ({match}) => {
  console.log({
    match
  })
  return (
    <Switch>
      <Route path={`${match.url}/information`} component={ManageInformation}/>
      <Route path={`${match.url}/edu-level`} component={ManageEduLevel}/>
      <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/manage/manage-system`}/>
    </Switch>
  )
}

export default ManageSystem;