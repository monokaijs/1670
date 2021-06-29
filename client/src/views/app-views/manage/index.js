import React, {useEffect} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import InnerAppLayout from 'layouts/inner-app-layout';
import {APP_PREFIX_PATH} from "../../../configs/AppConfig";
import ManageAccounts from "./manage-accounts";
import ManageCourses from "./manage-courses";
import {Menu, Spin} from "antd";
import {
	PlusSquareOutlined,
	TeamOutlined,
	UnorderedListOutlined,
	WarningOutlined,
	ToolOutlined,
	SolutionOutlined
} from '@ant-design/icons';
import ManageInformation from "./manage-system/manage-information";
import ManageEduLevel from "./manage-system/manage-edu-level";
import ManageRole from "./manage-system/manage-role";
import SpecificCourse from "./assign-course/specific-course";
import AssignCourse from "./assign-course";
import ManageCategories from "./manage-category";

const SettingOption = ({match, location, userInfo}) => {
	useEffect(() => {
		console.log(userInfo)
	}, )
	return (
		<Menu
			defaultSelectedKeys={`${match.url}/manage-accounts`}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			<Menu.Item key={`${match.url}/manage-accounts`}>
				<TeamOutlined/>
				<span>Manage Accounts</span>
				<Link to={'manage-accounts'}/>
			</Menu.Item>

			{
				userInfo.role === "training_staff" && (
					<>
						<Menu.Item key={`${match.url}/manage-courses`}>
							<WarningOutlined/>
							<span>Manage Courses</span>
							<Link to={'manage-courses'}/>
						</Menu.Item>

						<Menu.Item key={`${match.url}/manage-category`}>
							<SolutionOutlined/>
							<span>Manage Category</span>
							<Link to={'manage-category'}/>
						</Menu.Item>
					</>
				)
			}
			{
				userInfo.role === "admin" && (
					<Menu.SubMenu
						key="manage-system"
						title={
							<span>
            <ToolOutlined/>
            Manage System
          </span>
						}
					>
						<Menu.Item key={`${match.url}/manager-information`}>
							<PlusSquareOutlined/>
							<span>Manage Information</span>
							<Link to={'manage-information'}/>
						</Menu.Item>
						<Menu.Item key={`${match.url}/manage-role`}>
							<UnorderedListOutlined/>
							<span>Manage Role</span>
							<Link to={'manage-role'}/>
						</Menu.Item>
						<Menu.Item key={`${match.url}/manage-edu-level`}>
							<UnorderedListOutlined/>
							<span>Manage EduLevel</span>
							<Link to={'manage-edu-level'}/>
						</Menu.Item>
					</Menu.SubMenu>
				)
			}
		</Menu>
	);
};

const SettingContent = ({match}) => {
	return (
		<Switch>
			<Route path={`${match.url}/manage-accounts`} component={ManageAccounts}/>
			<Route path={`${match.url}/manage-courses`} component={ManageCourses}/>
			<Route path={`${match.url}/manage-information`} component={ManageInformation}/>
			<Route path={`${match.url}/manage-role`} component={ManageRole}/>
			<Route path={`${match.url}/manage-edu-level`} component={ManageEduLevel}/>
			<Route path={`${match.url}/manage-category`} component={ManageCategories}/>
			<Route path={`${match.url}/assign-courses`} component={AssignCourse}/>
			<Route path={`${match.url}/course/:courseId`} component={SpecificCourse}/>
			<Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/manage/manage-accounts`}/>
		</Switch>
	)
}

const Manage = (props) => {
	const {userInfo} = useSelector(state => state.auth);
	useEffect(() => {
		console.log("Manage", userInfo)
	}, )
	return (
		<div>
    {userInfo.role ? (
      ["admin", "training_staff"].includes(userInfo.role) ? (
        <InnerAppLayout
          sideContentWidth={320}
          sideContent={<SettingOption {...props} userInfo={userInfo}/>}
          mainContent={<SettingContent {...props} userInfo={userInfo}/>}
        />
      ) : (
        <Redirect to="/home"/>
      )
    ): (
      <div className="loading" style={{
        textAlign: "center",
        marginTop: "20%",
      }}>
        <Spin tip="Loading..."/>
      </div>
    ) }
		</div>
	);
}

export default Manage
