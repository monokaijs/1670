import React, {useState} from "react"
import {Col, Form, Select, Spin, Button} from "antd";

const {Option} = Select;
const SpecificCourse = ({setOnAssign, selectedCourse}) => {

	const [fetching, setFetching] = useState(false)
	const onFinish = () => {

	}

	const fetchTrainer = () => {

	}
	const handleChange = () => {

	}

	const fetchTrainee = () => {

	}
	const trainers = [{
		id: 1,
		trainer_name: "Nguyen Thu Thuy"
	},
		{
			id: 3,
			trainer_name: "Nguyen Thu Trang"
		},
		{
			id: 2,
			trainer_name: "Nguyen Gia Minh"
		}]

	const trainees = [{
		id: 1,
		trainee_name: "Nguyen Thu"
	},
		{
			id: 3,
			trainee_name: "Nguyen  Trang"
		},
		{
			id: 2,
			trainee_name: "Nguyen  Minh"
		}]

	return(
		<Form
			layout="vertical"
			onFinish={onFinish}
		>
			<Col xs={24} sm={24} md={24}>
				<Form.Item
					label="Trainer"
					name="category"
					rules={[
						{
							required: true,
							message: 'Please input trainer!',
						},
					]}
				>
					<Select
						mode="multiple"
						labelInValue
						placeholder="Select trainer"
						notFoundContent={fetching ? <Spin size="small" /> : null}
						filterOption={false}
						onSearch={fetchTrainer}
						onChange={handleChange}
						style={{ width: '100%' }}
					>
						{
							trainers.map((trainer,index) => {
								return 	<Option key={index} value={trainer.id}>{trainer.trainer_name}</Option>
							})
						}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} sm={24} md={24}>
				<Form.Item
					label="Trainee"
					name="trainee"
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
						notFoundContent={fetching ? <Spin size="small" /> : null}
						filterOption={false}
						onSearch={fetchTrainee}
						onChange={handleChange}
						style={{ width: '100%' }}
					>
						{
							trainees.map((trainee,index) => {
								return 	<Option key = {index} value={trainee.id}>{trainee.trainee_name}</Option>
							})
						}
					</Select>
				</Form.Item>
			</Col>
			<div style={{
				float: "right"
			}}>
				<Button className="mr-3" danger onClick={() => {setOnAssign(false)}} type="primary">Cancel</Button>
				<Button htmlType="submit" type="primary">Assign Course</Button>
			</div>
		</Form>
	)
}
export default SpecificCourse;