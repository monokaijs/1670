import React from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";
const {TextArea} = Input;
const {Option} = Select;
const dateFormat = "YYYY/MM/DD"

const EditCourseForm = ({visible, onClose}) => {

	const onFinish = (values) => {
		//   Call API
	}
	const onFinishFailed = () => {

	}

	return (
		<Modal
			title="Edit Course Information"
			visible={visible}
			width={700}
			onCancel={onClose}
			footer={null}
		>
			<Row gutter={ROW_GUTTER} className="mb-3">
				<Col xs={24} sm={24} md={24} lg={24} xxl={24} >
					<Form
						name="editCourse"
						layout="vertical"
						hideRequiredMark
						fields={[
							{
								name: 'course_name',
								value: "nguyenthuthuy"
							},
							{
								name: 'tutor',
								value: "1"
							},
							{
								name: 'category',
								value: "1"
							},
							{
								name: 'creation_time',
								value: moment("2020/06/04", "YYYY:MM:DD")
							},
							{
								name: 'description',
								value:"Here!"
							},
						]}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={12}>
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
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Tutor"
									name="tutor"
									rules={[{
										required: true,
										message: 'Please choose tutor!'
									}]}
								>
									<Select placeholder="Choose gender">
										<Option value="1">Nguyen Thu Thuy</Option>
										<Option value="2">Nguyen Thu Thuy 2</Option>
										<Option value="3">Nguyen Thu Thuy 3</Option>
									</Select>
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
									<Select defaultValue={1}>
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
							Save Change
						</Button>
					</Form>
				</Col>
			</Row>
		</Modal>
	)
}
export default EditCourseForm;