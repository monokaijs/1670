import React from 'react'
import {Button, Col, Form, Input, message, Row} from 'antd';
import ApiService from "../../../services/ApiService";

const ChangePassword = () => {


  const changePasswordFormRef = React.createRef();

  const onFinish = (value) => {
    const {password, new_password} = value;
    console.log("value", value)
    ApiService.changePassword({
      password,
      new_password,
    }).then(response => {
      console.log("response", response)
      message.success({content: response.message , duration: 2});
      onReset()
    }).catch(error => {
      console.log(error)
    })
  };

  const onReset = () => {
    changePasswordFormRef.current.resetFields();
  };


  return (
    <>
      <h2 className="mb-4">Change Password</h2>
      <Row>
        <Col xs={24} sm={24} md={24} lg={8}>
          <Form
            name="changePasswordForm"
            layout="vertical"
            ref={changePasswordFormRef}
            onFinish={onFinish}
          >
            <Form.Item
              label="Current Password"
              name="password"
              rules={[{
                required: true,
                message: 'Please enter your currrent password!'
              }]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[{
                required: true,
                message: 'Please enter your new password!'
              }]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={
                [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({getFieldValue}) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('new_password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Password not matched!');
                    },
                  }),
                ]
              }
            >
              <Input.Password/>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Change password
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  )

}

export default ChangePassword
