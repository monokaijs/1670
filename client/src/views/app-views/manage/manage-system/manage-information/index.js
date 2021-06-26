import React, {useState} from "react"
import {Button, Card, Col, Form, Input, Row, Table} from "antd";
import EditEduLevelForm from "../manage-edu-level/EditEduLevelForm";
import {ROW_GUTTER} from "../../../../../constants/ThemeConstant";
import './custom.css'
import ApiService from "../../../../../services/ApiService";


const ManageInformation = () => {
  const [onEdit, setOnEdit] = useState(false)

  const handleClick = async (values) => {
    setOnEdit(!onEdit)
  }
  const onFinish = async (values) => {

    if (onEdit) {
      // setOnEdit(false)
      await ApiService.updateInformation({
        site_name: values.site_name,
        email: values.email,
        phone_number: values.phone_number
      }).then(response => {
        setOnEdit(false)
      })

    }
  }
  const handleCancel = async (values) => {
    setOnEdit(false);
  }
  return (
    <>
      <div bodyStyle={{'padding': '32px'}}>
        <Form
          title="Information System"
          layout="vertical"
          onFinish={onFinish}
          fields={[
            {
              name: "site_name",
              value: "CMS - FPT System"
            },
            {
              name: "email",
              value: "haducc246@gmail.com"
            },
            {
              name: "phone_number",
              value: "0985306935"
            },
          ]}
        >
          <div className="mb-4 d-flex justify-content-end">
            {onEdit ? (
              <>
                <Button danger onClick={handleCancel}>Cancel</Button>
                <Button className="ml-3" type="primary" htmlType="submit">Save</Button>
              </>
            ) : ( <Button className="ml-3" type="primary" htmlType="submit"
                          onClick={handleClick}>Edit Information</Button>)}

          </div>


          <Row gutter={ROW_GUTTER} className="site-information">
            <Col sm={24} md={24} lg={24}>
              <Form.Item
                label="Site Name"
                name="site_name"
              >
                <Input disabled={!onEdit}/>
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={24}>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input disabled={!onEdit}/>
              </Form.Item>
            </Col>
            <Col sm={24} md={24} lg={24}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
              >
                <Input disabled={!onEdit}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>

  )
}
export default ManageInformation