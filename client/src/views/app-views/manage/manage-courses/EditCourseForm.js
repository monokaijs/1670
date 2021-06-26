import React, {useState} from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";
import ApiService from "../../../../services/ApiService";

const {TextArea} = Input;
const {Option} = Select;
const dateFormat = "YYYY/MM/DD"
const initialData = [
	{
		name: 'course_name',
		value: ""
	},
	{
		name: 'tutor',
		value: ""
	},
	{
		name: 'category',
		value: ""
	},
	{
		name: 'creation_time',
		value: moment(new Date(), "YYYY:MM:DD")
	},
	{
		name: 'description',
		value: ""
	},
]
const EditCourseForm = ({course, onAdd, visible, onClose}) => {
	const createCourse = (values) => {
		ApiService.createCourse({
			course_name: values.course_name,
			category: values.category,
			creation_time: values.creation_time,
			description: values.description
		}).then(response => {

		})
	}
	const updateCourse = (values) => {
		ApiService.updateCourse({
			course_id: course.id,
			course_name: values.course_name,
			category: values.category,
			creation_time: values.creation_time,
			description: values.description
		}).then(response => {

		})
	}
	const onFinish = async (values) => {
		//   Call API
		if(onAdd) {
			await createCourse(values)
		} else {
			await  updateCourse(values)
		}

	}
	const onFinishFailed = () => {

	}

	return (
		<Modal
			title={onAdd ? "Add Course" : "Edit Course"}
			visible={visible}
			width={700}
			onCancel={onClose}
			footer={null}
		>
			<Row gutter={ROW_GUTTER} className="mb-3">
				<Col xs={24} sm={24} md={24} lg={24} xxl={24}>
					<Form
						name="editCourse"
						layout="vertical"
						hideRequiredMark
						fields={onAdd ? initialData : [
							{
								name: 'course_name',
								value: course?.course_name
							},
							{
								name: 'category',
								value: course?.category
							},
							{
								name: 'creation_time',
								value: moment(course?.creation_time, "YYYY:MM:DD")
							},
							{
								name: 'description',
								value: course?.description
							},
						]}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={24}>
								<Form.Item
									label="Course Name"
									name="course_name"
									rules={[
										{
											required: true,
											message: 'Please input course name!'
										},
									]}
								>
									<Input/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Category"
									name="category"
									rules={[
										{
											required: true,
											message: 'Please input course\'s category!',
										},
									]}
								>
									<Select>
										<Option value="1">Information Technology</Option>
										<Option value="2">Information Technology 2</Option>
										<Option value="3">Information Technology 3</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									name="creation_time"
									label="Creation Time"
									rules={[
										{
											required: true,
											message: 'Please input creation time!',
										},
									]}
								>
									<DatePicker style={{width: "100%"}}
										// defaultValue={moment(userInfo.dob, dateFormat)}
															format={dateFormat}/>
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={24}>
								<Form.Item
									label="Description"
									name="description"
								>
									<TextArea rows={4}/>
								</Form.Item>
							</Col>
						</Row>
						<Button type="primary" htmlType="submit" style={{float: "right"}}>
							{!onAdd ? "Save" : "Create Course"}
						</Button>
					</Form>
				</Col>
			</Row>
		</Modal>
	)
}
export default EditCourseForm;