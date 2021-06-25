import React, {useState} from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, notification} from "antd";
import {ROW_GUTTER} from "../../../../constants/ThemeConstant";
import moment from "moment";
import ApiService from "../../../../services/ApiService";

const {TextArea} = Input;
const {Option} = Select;
const dateFormat = "YYYY/MM/DD"
const initialData = [
  {
    name: 'course_name',
    value: ""
  },
  {
    name: 'tutor',
    value: ""
  },
  {
    name: 'category',
    value: ""
  },
  {
    name: 'creation_time',
    value: moment(new Date(), "YYYY:MM:DD")
  },
  {
    name: 'description',
    value: ""
  },
]
const EditCourseForm = ({onAdd, visible, onClose}) => {

  const onFinish = (values) => {
    //   Call API
    ApiService.createCourse({
      course_name: values.course_name,
      // tutor: values.tutor,
      category: values.category,
      creation_time: values.creation_time,
      description: values.description
    })
  }
  const onFinishFailed = () => {

  }

  return (
    <Modal
      title={onAdd ? "Add Course" : "Edit Course" }
      visible={visible}
      width={700}
      onCancel={onClose}
      footer={null}
    >
      <Row gutter={ROW_GUTTER} className="mb-3">
        <Col xs={24} sm={24} md={24} lg={24} xxl={24}>
          <Form
            name="editCourse"
            layout="vertical"
            hideRequiredMark
            fields={onAdd ? initialData : [
              {
                name: 'course_name',
                value: "nguyenthuthuy"
              },
              {
                name: 'category',
                value: "1"
              },
              {
                name: 'creation_time',
                value: moment("2020/06/04", "YYYY:MM:DD")
              },
              {
                name: 'description',
                value: "Here!"
              },
            ]}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label="Course Name"
                  name="course_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input course name!'
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={ROW_GUTTER}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: 'Please input course\'s category!',
                    },
                  ]}
                >
                  <Select>
                    <Option value="1">Information Technology</Option>
                    <Option value="2">Information Technology 2</Option>
                    <Option value="3">Information Technology 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="creation_time"
                  label="Creation Time"
                  rules={[
                    {
                      required: true,
                      message: 'Please input creation time!',
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
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  label="Description"
                  name="description"
                >
                  <TextArea rows={4}/>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" style={{float: "right"}}>
              {!onAdd ? "Save" : "Create Course"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
export default EditCourseForm;