import React from "react"
import {Modal, Form, Input, DatePicker, Button, Upload, Row, Col} from "antd";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import ApiService from "../../services/ApiService";
import moment from "moment";

const NewMaterialForm = ({visible, onClose}) => {
  const onFinish = (values) => {
    const due_date = new Date(moment(values.due_date).format("YYYY:MM:DD")).getTime()
    console.log({values})
    ApiService.createMaterialCourse({
      due_date: due_date,
      material_name: values.material_name,
      link_file: values.link_file
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
      title="New Material"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="material_name"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the material!',
            },
          ]}
        >
          <Input placeholder="Input material name..." />
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

        <Form.Item
          name="link_file"
          label="File"
          rules={[
            {
              required: true,
              message: 'Please input the link file!',
            },
          ]}
        >
          <Input placeholder="Input link material" />
        </Form.Item>

        <div className="d-flex flex-row justify-content-end">
           <Button type="primary" danger className="mr-2" onClick={onClose}>Cancel</Button>
           <Button type="primary" htmlType="submit">Add Activity</Button>
        </div>
      </Form>
    </Modal>
  )
}
export default NewMaterialForm;