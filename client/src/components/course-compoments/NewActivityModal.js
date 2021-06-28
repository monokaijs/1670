import React from "react"
import {Modal, Form, Input, DatePicker, Button} from "antd";
import ApiService from "../../services/ApiService";
import moment from "moment";

const NewActivityModal = ({visible, onClose}) => {
  const onFinish = (values) => {
    const due_date = new Date(moment(values.due_date).format("YYYY:MM:DD")).getTime()
    ApiService.createActivityCourse({
      activity_name: values.activity_name,
      due_date: due_date,
    }).then(response => {

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
          <Input placeholder="Input activity name..."  />
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
          }} showTime placeholder="Select Time" onChange={onChange} onOk={onOk} />
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