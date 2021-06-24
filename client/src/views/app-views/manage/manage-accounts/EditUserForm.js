
import React from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";
import {UserOutlined} from "@ant-design/icons";
import Flex from "../../../../components/shared-components/Flex";
import ApiService from "../../../../services/ApiService";
const {TextArea} = Input;
const {Option} = Select;
const dateFormat = "YYYY/MM/DD"

const EditUserForm = ({visible, onClose, user, onRender, setOnRender}) => {

	const onFinish = (values) => {
		//   Call API
	}

	const onFinishFailed = () => {

	}

	const toTitleCase = (str) =>  {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}

	const selectRoles = () => {
		const roles = ["admin", "staff", "trainee", "trainer"];
		let rolesOption = [];
		rolesOption = roles.map((roles, index) => {
			return(
				// <Option key={index.toString(36)+index} value={roles}>{toTitleCase(roles)}</Option>
				<Option key={index.toString(36)+index} value={roles}>{toTitleCase(roles)}</Option>
			)
		})
		return rolesOption;
	}
	const handleChange = () => {


	}
	return (
		<Modal
			title="Edit User Information"
			visible={visible}
			width={700}
			onCancel={onClose}
			footer={null}
		>
			<Row gutter={ROW_GUTTER} className="mb-3">
				<Col xs={24} sm={24} md={24} lg={24} xxl={24} >
					<Form
						name="basicInformation"
						layout="vertical"
						hideRequiredMark
						fields={[
							{
								name: 'username',
								value: "nguyenthuthuy"
							},
							{
								name: 'email',
								value: "haducc@gmail.com"
							},
							{
								name: 'full_name',
								value: "Nguyen Thu Thuy"
							},
							{
								name: 'roles',
								value: "admin"
							},
							{
								name: 'gender',
								value: "1"
							},
							{
								name: 'edu_level',
								value: "1"
							},
							{
								name: 'dob',
								value: moment("2020/06/04", "YYYY:MM:DD")
							},
							{
								name: 'bio',
								value: "Here!"
							},
						]}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Name"
									name="full_name"
									rules={[
										{
											required: true,
											message: 'Please input your name!',
										},
									]}
								>
									<Input/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									label="Username"
									name="username"
									rules={[
										{
											required: true,
											message: 'Please input your username!'
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
									label="Email"
									name="email"
									rules={[{
										required: true,
										type: 'email',
										message: 'Please enter a valid email!'
									}]}
								>
									<Input/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									name="dob"
									label="Date Of Birth"
									rules={[
										{
											required: true,
											message: 'Please input your birthday!',
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
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									name="gender"
									label="Gender"
									placeholder="Select gender"
									rules={[
										{
											required: true,
											message: 'Please choose your gender!',
										},
									]}
								>
									<Select placeholder="Choose gender">
										<Option value="1">Male</Option>
										<Option value="2">Female</Option>
										<Option value="3">Other</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={12}>
								<Form.Item
									name="edu_level"
									label="EduLevel"
									placeholder="Select edu level"
								>
									<Select placeholder="Choose edu level">
										<Option value="1">Đại học</Option>
										<Option value="2">Cấp ba</Option>
										<Option value="3">Other</Option>
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={24}>
								<Form.Item
									name="roles"
									label="Role"
									rules={[
										{
											required: true,
											message: 'Please choose your role!',
										},
									]}
								>
									<Select
										// mode="multiple"
										style={{ width: '100%' }}
										placeholder="Please select"
										// defaultValue={['a10', 'c12']}
										onChange={handleChange}
									>
										{selectRoles()}
									</Select>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={ROW_GUTTER}>
							<Col xs={24} sm={24} md={24}>
								<Form.Item
									label="Biography"
									name="bio"
								>
									<TextArea rows={4}/>
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={ROW_GUTTER}>
							<Col span={24}>
								<Form.Item
									name="password"
									label="Password (if you want)"
								>
									<Input/>
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
export default EditUserForm;