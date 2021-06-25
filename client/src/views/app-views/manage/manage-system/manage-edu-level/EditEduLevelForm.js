import React from 'react';
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import {ROW_GUTTER} from "../../../../../constants/ThemeConstant";
import moment from "moment";

const initData = [{
  name: 'edu_level',
  value: ''
}]
const EditEduLevelForm = ({onAdd, visible, onClose}) => {
  const onFinish = (values) => {

  }
  const onFinishFailed = () => {

  }
  return (
    <Modal
      title={onAdd ? "Add Edu Level" : "Edit Edu Level" }
      visible={visible}
      width={700}
      onCancel={onClose}
      footer={null}
    >
      <Row gutter={ROW_GUTTER} className="mb-3">
        <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
          <Form
            name="editEduLevel"
            layout="vertical"
            fields={!onAdd ? [{
              name: 'edu_level',
              value: 'Dai Hoc'
            }] : initData}
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label="Edu Level"
                  name="edu_level"
                  rules={[
                    {
                      required: true,
                      message: 'Please input edu level!'
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              {!onAdd ? "Save Change" : "Create Edu Level"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
export default EditEduLevelForm;