import React, {useEffect} from 'react';
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import {ROW_GUTTER} from "../../../../../constants/ThemeConstant";
import moment from "moment";
import ApiService from "../../../../../services/ApiService";

const initData = [{
  name: 'edu_level',
  value: ''
}]
const EditEduLevelForm = ({eduLevel, onAdd, visible, onClose}) => {

  const createEduLevel = (values) => {
    //  Call API
    ApiService.createEduLevel({
      edu_level: values.edu_level,
      creation_time: values.creation_time,
    }).then(response => {

    })
  }

  const updateEduLevel = (values) => {
    //  Call API
    ApiService.updateEduLevel({
      edu_id: eduLevel.edu_id,
      edu_level: values.edu_level,
    }).then(response => {

    })
  }
  const onFinish = async (values) => {
    if (onAdd) {
      await createEduLevel(values)
    } else {
      await updateEduLevel(values)
    }
  }
  const onFinishFailed = () => {

  }
  return (
    <Modal
      title={onAdd ? "Add Edu Level" : "Edit Edu Level"}
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