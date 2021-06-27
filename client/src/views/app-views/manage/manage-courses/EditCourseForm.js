import React, {useState} from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification, message} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";
import ApiService from "../../../../services/ApiService";
import {useSelector} from "react-redux";

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
    message.loading('Updating...');
		ApiService.createCourse({
			course_name: values.course_name,
			category: values.category,
			description: values.description
		}).then(response => {
      message.destroy();
      if (response.error) {
        message.error(response.message);
      } else {
        window.location.reload();
      }
		})
	}
  const systemConfig = useSelector(state => state.config.system);

	const updateCourse = (values) => {
    message.loading('Updating...');
		ApiService.updateCourse({
			course_id: course._id,
			course_name: values.course_name,
			category: values.category,
			description: values.description
		}).then(response => {
      message.destroy();
		  if (response.error) {
		    message.error(response.message);
      } else {
		    window.location.reload();
      }
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

	console.log("categories", systemConfig.courseCategories);

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
								value: course?.title
							},
							{
								name: 'category',
								value: course?.category
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
							<Col xs={24} sm={24} md={24}>
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
                    {systemConfig.courseCategories.map(choice => (
                      <Select.Option value={choice.code}>{choice.name}</Select.Option>
                    ))}
									</Select>
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
