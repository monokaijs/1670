import React from 'react';
import {Button, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import {ROW_GUTTER} from "../../../../../constants/ThemeConstant";
import moment from "moment";
import ApiService from "../../../../../services/ApiService";

const initData = [{
  name: 'role',
  value: ''
}]
const EditRoleForm = ({role, onAdd, visible, onClose}) => {
  const updateRole = (values) => {
    ApiService.updateRole({
      slug: role,
      title: values.role
    }).then(response => {
      // console.log(response)
    })
  }

  const createRole = (values) => {
    console.log(values)
    ApiService.createRole({
      slug: values.role.toLowerCase().replace(/\s/g, "-"),
      title: values.role
    }).then(response => {
    })
  }
  const onFinish = (values) => {
    if(onAdd) {
      console.log("Add")
      createRole(values)
    } else {
      updateRole(values)
    }
  }


  const onFinishFailed = () => {

  }
  return (
    <Modal
      title={onAdd ? "Add Role" : "Edit Role" }
      visible={visible}
      width={700}
      onCancel={onClose}
      footer={null}
    >
      <Row gutter={ROW_GUTTER} className="mb-3">
        <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
          <Form
            name="editRole"
            layout="vertical"
            fields={!onAdd ? [{
              name: 'role',
              value: 'Admin'
            }] : initData}
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: 'Please input role!'
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              {!onAdd ? "Save Change" : "Create Role"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
export default EditRoleForm;
