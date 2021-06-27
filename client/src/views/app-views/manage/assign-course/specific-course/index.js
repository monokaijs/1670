import React, {useState} from "react"
import {Col, Form, Select, Spin, Button} from "antd";
import ApiService from "../../../../../services/ApiService";

const {Option} = Select;
const SpecificCourse = ({setOnAssign, trainers, trainees, selectedCourse}) => {

	const [fetching, setFetching] = useState(false)

	const onFinish = (values) => {
		ApiService.assignCourse({
			course_id: selectedCourse._id,
			trainer: values.trainer,
			trainees: values.trainees,
		}).then(response => {

		})

	}

	const fetchTrainer = () => {

	}

	const handleChange = () => {

	}

	const fetchTrainee = () => {

	}

	return (
		<Form
			layout="vertical"
			onFinish={onFinish}
		>
			<Col xs={24} sm={24} md={24}>
				<Form.Item
					label="Trainer"
					name="trainer"
					rules={[
						{
							required: true,
							message: 'Please input trainer!',
						},
					]}
				>
					<Select
						labelInValue
						placeholder="Select trainer"
						notFoundContent={fetching ? <Spin size="small"/> : null}
						filterOption={false}
						onSearch={fetchTrainer}
						onChange={handleChange}
						style={{width: '100%'}}
					>
						{
							trainers.map((trainer, index) => {
								return <Option key={index} value={trainer.username}>{trainer.fullName}</Option>
							})
						}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={24}>
				<Form.Item
					label="Trainee"
					name="trainees"
					rules={[
						{
							required: true,
							message: 'Please input trainee!',
						},
					]}
				>
					<Select
						mode="multiple"
						labelInValue
						placeholder="Select trainee"
						notFoundContent={fetching ? <Spin size="small"/> : null}
						filterOption={false}
						onSearch={fetchTrainee}
						onChange={handleChange}
						style={{width: '100%'}}
					>
						{
							trainees.map((trainee, index) => {
								return <Option key={index} value={trainee.username}>{trainee.fullName}</Option>
							})
						}
					</Select>
				</Form.Item>
			</Col>
			<div style={{
				float: "right"
			}}>
				<Button className="mr-3" danger onClick={() => {
					setOnAssign(false)
				}} type="primary">Cancel</Button>
				<Button htmlType="submit" type="primary">Assign Course</Button>
			</div>
		</Form>
	)
}


export default SpecificCourse;
