import React from "react"
import {Modal, Form, Input, DatePicker, Button, Select, notification} from "antd";
import ApiService from "../../services/ApiService";
import moment from "moment";
import {Option} from "antd/es/mentions";

const NewActivityModal = ({onRender, setOnRender, visible, onClose, course_id}) => {
  const onFinish = (values) => {
    const due_date = new Date(moment(values.due_date).format("YYYY:MM:DD")).getTime()
    const start_date = new Date(moment(values.start_date).format("YYYY:MM:DD")).getTime()
    ApiService.createActivityCourse({
      course_id: course_id,
      activity_name: values.activity_name,
      due_date: due_date,
      start_date: start_date,
      activity_type: values.activity_type,
    }).then(response => {
      if (!response.error) {
        notification.success({
          message: response.message
        });
        setOnRender(!onRender);
      } else {
        notification.error({
          message: response.message
        })
      }
    })
  }

  const onOk = () => {

  }

  const onChange = () => {

  }
  const {form} = Form.useForm()
  return (
    <Modal
      title="New Activity"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        fields={[
          {
            name: "activity_type",
            value: "assignment"
          }
        ]}

      >
        <Form.Item
          name="activity_name"
          label="Activity"
          rules={[
            {
              required: true,
              message: 'Please input the activity!',
            },
          ]}
        >
          <Input placeholder="Input activity name..."/>
        </Form.Item>

        <Form.Item
          name="activity_type"
          label="Type"
          rules={[
            {
              required: true,
              message: 'Please input the type!',
            },
          ]}
        >
          <Select value="assignment">
            <Select.Option value="assignment">Assignment</Select.Option>
            <Select.Option value="progressive-test">Progressive Test</Select.Option>
            <Select.Option value="presentation">Presentation</Select.Option>
            <Select.Option value="exercise">Exercise</Select.Option>
            <Select.Option value="demonstration">Demonstration</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="start_date"
          label="Start Date"
          rules={[
            {
              required: true,
              message: 'Please input the start date!',
            },
          ]}
        >
          <DatePicker style={{
            width: "100%"
          }} showTime placeholder="Select Time" onChange={onChange} onOk={onOk}/>
        </Form.Item>

        <Form.Item
          name="due_date"
          label="Due Date"
          rules={[
            {
              required: true,
              message: 'Please input the due date!',
            },
          ]}
        >
          <DatePicker style={{
            width: "100%"
          }} showTime placeholder="Select Time" onChange={onChange} onOk={onOk}/>
        </Form.Item>
        <div className="d-flex flex-row justify-content-end">
          <Button type="primary" danger className="mr-2" onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">Add Activity</Button>
        </div>
      </Form>
    </Modal>
  )
}
export default NewActivityModal;