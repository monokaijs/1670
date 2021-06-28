import React, {useEffect, useState} from "react";
import {
	useParams
} from "react-router-dom";
import ApiService from "../../../../services/ApiService";
import {PageHeaderAlt} from "../../../../components/layout-components/PageHeaderAlt";
import Flex from "../../../../components/shared-components/Flex";
import {Button, Card, Row, Col, Comment, Radio, Skeleton, Tag, Timeline, Empty, notification, Modal} from "antd";
import {
	CloudDownloadOutlined,
	UserOutlined,
	TagOutlined,
	FileTextOutlined,
	PlusSquareOutlined, CheckCircleOutlined, DeleteOutlined
} from "@ant-design/icons";
import AvatarStatus from "../../../../components/shared-components/AvatarStatus";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import {useSelector} from "react-redux";
import NewActivityModal from "../../../../components/course-compoments/NewActivityModal";
import NewMaterialForm from "../../../../components/course-compoments/NewMaterialForm";
import moment from "moment";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";

const {confirm} = Modal;

const MyCourse = (props) => {
	let {courseId} = useParams();
	const [course, setCourse] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const {userInfo} = useSelector(state => state.auth);
	const [newActivityForm, setNewActivityForm] = useState(false);
	const [newMaterialForm, setNewMaterialForm] = useState(false);
	const [courseActivities, setCourseActivities] = useState([])
	const [onRender, setOnRender] = useState(false);
	const [courseMaterials, setCourseMaterials] = useState(null);

	const loadActivities = () => {
		ApiService.loadCourseActivities({
			course_id: courseId
		}).then(response => {
			response.activities.sort((a, b) => {
				return (a.startDate > b.startDate) ? 1 : ((a.startDate < b.startDate) ? -1 : 0)
			})
			setCourseActivities(response.activities);
		})
	}

	const loadCourseMaterials = () => {
		ApiService.loadCourseMaterials({
			course_id: courseId
		}).then(response => {
			setCourseMaterials(response.materials)
		})
	}

	const loadCourseInfo = () => {
		ApiService.loadCourseInfo({
			course_id: courseId
		}).then(response => {
			setIsLoading(false);
			setCourse(response);
		});
	}
	useEffect(() => {
		loadCourseInfo();
		loadActivities();
		loadCourseMaterials();
	}, [onRender]);
	const handleNewActivityForm = () => {
		setNewActivityForm(true);
	}
	const closeNewActivityForm = () => {
		setNewActivityForm(false);
	}

	const handleNewMaterialForm = () => {
		setNewMaterialForm(true);
	}
	const closeNewMaterialForm = () => {
		setNewMaterialForm(false);
	}

	return (
		<>
			<PageHeaderAlt className="border-bottom">
				<div className="container-fluid">
					<Flex justifyContent="between" alignItems="center" className="py-4">
						<h2>{course.title}</h2>
						<div>
							<UserOutlined/> {course.tutor?.fullName}
						</div>
					</Flex>
				</div>
			</PageHeaderAlt>
			<div className="container mt-4">
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} lg={16} xl={16}>
						<Card
							title="Timeline"
							extra={<>
								{userInfo.role === "trainer" && (
									<>
										<Button onClick={handleNewActivityForm}>
											<PlusSquareOutlined/> New Activity
										</Button>
										<Button className="ml-2" onClick={handleNewMaterialForm}>
											<FileTextOutlined/> New Material
										</Button>
									</>
								)}
							</>}
						>
							<Skeleton loading={isLoading} paragraph={{
								rows: 2
							}}/>
							<div className="mt-4">
								{
									courseActivities.length > 0 ? (
										<Timeline>
											{courseActivities?.map((activity, index) => {
												return (
													<Timeline.Item key={index}
																				 dot={activity.isDue ?
																					 <CheckCircleOutlined style={{fontSize: '16px'}}/> : false}>
														<b>{moment(activity.startDate).format("LL")}</b> {activity.name}
													</Timeline.Item>
												);
											})}
										</Timeline>
									) : (
										<Empty/>
									)
								}
							</div>
							<h4>Course Materials</h4>

							{courseMaterials?.length > 0 ? (
								<Row gutter={ROW_GUTTER}>
									{courseMaterials?.map(material => {
										const actions = [
											<CloudDownloadOutlined onClick={() => {
												window.open(material.link, "_blank");
											}} key="download"/>
										];
										if (userInfo.role === "trainer") actions.push(<DeleteOutlined onClick={() => {
											console.log('hello')
											confirm({
												title: "Delete Material",
												content: "Are you sure to delete this material",
												onOk() {
													console.log(material)
													ApiService.deleteCourseMaterial({
														material_id: material._id
													}).then(response => {
														if (!response.error) {
															notification.success({
																message: response.message
															})
															setOnRender(!onRender);
														} else {
															notification.error({
																message: response.message
															})
														}
													});
												},
											});
										}} key="delete"/>);
										return (
											<Col xs={24} sm={24} md={12} lg={12} xl={8}>
												<Card
													actions={actions}
												>
													<Skeleton loading={false} avatar active>
														<Meta
															avatar={
																<Avatar icon={<FileTextOutlined/>}/>
															}
															title={material.name}
															description={material.author.fullName}
														/>
													</Skeleton>
												</Card>
											</Col>
										)
									})}

								</Row>
							) : (
								<Empty/>
							)}

						</Card>
						{courseActivities?.map((activity, index) => {
							return (
								<Card
									type="inner"
									title={activity.name}
									extra={userInfo.role === "trainer" ? (<Button onClick={() => {
										confirm({
											title: "Delete Activity",
											content: "Are you sure to delete this activity",
											onOk() {
												ApiService.deleteCourseActivity({
													activity_id: activity._id
												}).then(response => {
													if (!response.error) {
														notification.success({
															message: response.message
														})
														setOnRender(!onRender);
													} else {
														notification.error({
															message: response.message
														})
													}
												});
											},
										});
									}}>Delete</Button>) : (null)}
								>
									<div>
										<p className="m-0" style={{
											textTransform: "capitalize"
										}}><b>Type: </b>{activity.type}</p>
										<p className="m-0"><b>Start Date: </b>{moment(activity.startDate).format("LL")}</p>
										<p><b>Due Date: </b>{moment(activity.dueDate).format("LL")}</p>
									</div>

								</Card>
							)
						})}

					</Col>
					<Col xs={24} sm={24} md={24} lg={8} xl={8}>
						<Card
							title="About"
						>
							{!isLoading && (
								<div>
									<div style={{marginBottom: 20}}>
										<Tag>
											<TagOutlined/>
											<span className="ml-2 font-weight-semibold">{course.category?.name}</span>
										</Tag>
									</div>
								</div>
							)}
							<p>
								{course?.description}
							</p>
						</Card>
						<Card
							title="Trainees"
						>
							<div className="mt-3">
								{
									course.trainees?.map((trainee, i) => (
										<div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
											<AvatarStatus id={i} src={trainee.avatar} name={trainee.fullName}
																		subTitle={"@" + trainee.username}/>
										</div>
									))
								}
							</div>
						</Card>
					</Col>
				</Row>
			</div>
			<NewActivityModal onRender={onRender} setOnRender={setOnRender} course_id={courseId} visible={newActivityForm}
												onClose={closeNewActivityForm}/>
			<NewMaterialForm onRender={onRender} setOnRender={setOnRender} course_id={courseId} visible={newMaterialForm}
											 onClose={closeNewMaterialForm}/>
		</>
	)
}

export default MyCourse;
