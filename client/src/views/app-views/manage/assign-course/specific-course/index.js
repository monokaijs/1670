import React, {useEffect, useRef, useState} from "react"
import {Col, Form, Select, Spin, Button} from "antd";
import ApiService from "../../../../../services/ApiService";
import continuous from "d3-scale/src/continuous";

const {Option} = Select;
const SpecificCourse = (props) => {
  const setOnAssign = props.setOnAssign;
  const selectedCourse = props.selectedCourse;
  const setFieldsValue = props.setFieldsValue;
	const [fetching, setFetching] = useState(false);
	const [trainees, setTrainees] = useState([]);
	const [trainers, setTrainers] = useState([]);
	const [chosenTrainees, setChosenTrainees] = useState([]);
  const [chosenTrainer, setChosenTrainer] = useState({username: ""});
  const [form] = Form.useForm()

  useEffect(async () => {
    ApiService.loadAccounts({}).then(response => {
      let trainerAccount = [];
      let traineeAccount = [];
      response.accounts.forEach(account => {
        if(account.role === "trainee") {
          traineeAccount.push(account)
        } else if(account.role === "trainer") {
          trainerAccount.push(account)
        } else {
          continuous();
        }
      });
      setTrainees(traineeAccount);
      setTrainers(trainerAccount);
      ApiService.loadCourseInfo({
        course_id: selectedCourse._id
      }).then(response => {
        form.setFieldsValue({
          trainer: response.tutor ? response.tutor.username : "",
          trainees: response.trainees.map(x => x.username)
        });
      })
    });
  }, [])

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
      form={form}
		>
			<Col xs={24} sm={24} md={24}>
				<Form.Item
					label="Trainer"
					name="trainer"
					rules={[
						{
							required: false
						},
					]}
				>
					<Select
						placeholder="Select trainer"
						notFoundContent={fetching ? <Spin size="small"/> : null}
						filterOption={false}
						onSearch={fetchTrainer}
						onChange={handleChange}
						style={{width: '100%'}}
					>
						<Option value="">Unset</Option>
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
						placeholder="Select trainee"
						notFoundContent={fetching ? <Spin size="small"/> : null}
						filterOption={false}
						onSearch={fetchTrainee}
						onChange={handleChange}
						style={{width: '100%'}}
					>
						{
							trainees.map((trainee, index) => {
								return <Option key={index.toString(36)+index} value={trainee.username}>{trainee.fullName}</Option>
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
