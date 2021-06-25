import React, {useEffect} from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";

const {TextArea} = Input;
const {Option} = Select;
const dateFormat = "YYYY/MM/DD"

const initArray = [
  {
    name: 'username',
    value: ""
  },
  {
    name: 'email',
    value: ""
  },
  {
    name: 'full_name',
    value: ""
  },
  {
    name: 'roles',
    value: ""
  },
  {
    name: 'gender',
    value: ""
  },
  {
    name: 'edu_level',
    value: ""
  },
  {
    name: 'dob',
    value: moment(new Date(), "YYYY:MM:DD")
  },
  {
    name: 'bio',
    value: ""
  },
]

const EditUserForm = ({onAdd, visible, onClose, user, onRender, setOnRender}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    //   Call API
  }

  const onFinishFailed = () => {
  }

  useEffect(() => {
    console.log({
      onAdd
    })
  }, [onAdd])
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const selectRoles = () => {
    const roles = ["admin", "staff", "trainee", "trainer"];
    let rolesOption = [];
    rolesOption = roles.map((roles, index) => {
      return (
        <Option key={index.toString(36) + index} value={roles}>{toTitleCase(roles)}</Option>
      )
    })
    return rolesOption;
  }
  const handleChange = () => {
  }
  return (
    <Modal
      title={!onAdd ? "Edit User Information" : "Add User"}
      visible={visible}
      width={700}
      onCancel={onClose}
      footer={null}
    >
      <Row gutter={ROW_GUTTER} className="mb-3">
        <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
          <Form
            name="basicInformation"
            layout="vertical"
            hideRequiredMark
            // initialValues={!onAdd ? {
            //   username: "nguyenthuthuy"
            // } : {username: ""}}
            fields={!onAdd ? [
              {
                name: 'username',
                value: "nguyenthuthuy"
              },
              {
                name: 'email',
                value: "haducc@gmail.com"
              },
              {
                name: 'full_name',
                value: "Nguyen Thu Thuy"
              },
              {
                name: 'roles',
                value: "admin"
              },
              {
                name: 'gender',
                value: "1"
              },
              {
                name: 'edu_level',
                value: "1"
              },
              {
                name: 'dob',
                value: moment("2020/06/04", "YYYY:MM:DD")
              },
              {
                name: 'bio',
                value: "Here!"
              },
            ]: initArray}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Full_name"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!'
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
            </Row>
            {onAdd ? (
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password'
                      }
                    ]}
                    hasFeedback
                  >
                    <Input.Password/>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your confirm password'
                      },
                      ({getFieldValue}) => ({
                        validator(rule, value) {
                          if(!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          } else {
                            return Promise.reject("Passwords do not match!")
                          }
                        }
                      })
                    ]}
                    hasFeedback
                  >
                    <Input.Password/>
                  </Form.Item>
                </Col>
              </Row>
            ) : (null)}

            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{
                    required: true,
                    type: 'email',
                    message: 'Please enter a valid email!'
                  }]}
                >
                  <Input/>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="dob"
                  label="Date Of Birth"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your birthday!',
                    },
                  ]}
                >
                  <DatePicker style={{width: "100%"}}
                    // defaultValue={moment(userInfo.dob, dateFormat)}
                              format={dateFormat}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  placeholder="Select gender"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your gender!',
                    },
                  ]}
                >
                  <Select placeholder="Choose gender">
                    <Option value="1">Male</Option>
                    <Option value="2">Female</Option>
                    <Option value="3">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="edu_level"
                  label="EduLevel"
                  placeholder="Select edu level"
                >
                  <Select placeholder="Choose edu level">
                    <Option value="1">Đại học</Option>
                    <Option value="2">Cấp ba</Option>
                    <Option value="3">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  name="roles"
                  label="Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose your role!',
                    },
                  ]}
                >
                  <Select
                    // mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                  >
                    {selectRoles()}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label="Biography"
                  name="bio"
                >
                  <TextArea rows={4}/>
                </Form.Item>
              </Col>
            </Row>

            {!onAdd ? (
              <Row gutter={ROW_GUTTER}>
                <Col span={24}>
                  <Form.Item
                    name="password"
                    label="Password (if you want)"
                  >
                    <Input/>
                  </Form.Item>
                </Col>
              </Row>
            ) : null}
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              Save Change
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
)
}
export default EditUserForm;