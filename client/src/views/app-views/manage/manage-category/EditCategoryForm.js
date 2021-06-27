import React, {useState} from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";
import ApiService from "../../../../services/ApiService";


const {confirm} = Modal;

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
const EditCategoryForm = ({category, onAdd, visible, onClose}) => {
	const createCategory = (values) => {
		ApiService.createCategory({
			category_name: values.category_name,
			code: values.code,
			creation_time: values.creation_time,
			description: values.description
		}).then(response => {
			confirm({
				title: response.error ? "Error" : "Success",
				content: response.message,
				onOk() {
					window.location.reload();
				},
			});
		})
	}
	const updateCategory = (values) => {
		ApiService.updateCourse({
			category_id: category.id,
			category_name: values.category_name,
			code: values.code,
			creation_time: values.creation_time,
			description: values.description
		}).then(response => {
			confirm({
				title: response.error ? "Error" : "Success",
				content: response.message,
				onOk() {
					window.location.reload();
				},
			});
		})
	}
	const onFinish = async (values) => {
		//   Call API
		if(onAdd) {
			await createCategory(values)
		} else {
			await  updateCategory(values)
		}

	}
	const onFinishFailed = () => {

	}

	return (
		<Modal
			title={onAdd ? "Add Category" : "Edit category"}
			visible={visible}
			width={700}
			onCancel={onClose}
			footer={null}
		>
			<Row gutter={ROW_GUTTER} className="mb-3">
				<Col xs={24} sm={24} md={24} lg={24} xxl={24}>
					<Form
						name="editCategory"
						layout="vertical"
						hideRequiredMark
						fields={onAdd ? initialData : [
							{
								name: 'category_name',
								value: category?.category_name
							},
							{
								name: 'code',
								value: category?.code
							},
							{
								name: 'creation_time',
								value: moment(category?.creation_time, "YYYY:MM:DD")
							},
							{
								name: 'description',
								value: category?.description
							},
						]}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={24}>
								<Form.Item
									label="Category Name"
									name="category_name"
									rules={[
										{
											required: true,
											message: 'Please input category name!'
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
									label="Code"
									name="code"
									rules={[
										{
											required: true,
											message: 'Please input code!',
										},
									]}
								>
									<Input/>
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
export default EditCategoryForm;
