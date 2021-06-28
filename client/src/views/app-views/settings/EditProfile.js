import React from 'react';
import {Avatar, Button, Col, DatePicker, Form, Input, message, Row, Select, Upload} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {ROW_GUTTER} from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import ApiService from "../../../services/ApiService";
import ImgCrop from 'antd-img-crop';
import {API_BASE_URL} from "../../../configs/AppConfig";

const {TextArea} = Input;


const EditProfile = () => {

  const userInfo = useSelector(state => state.auth['userInfo']);

  console.log("User Info:", userInfo)

  const dateFormat = 'YYYY/MM/DD';

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  const onFinish = async values => {
    const key = 'updatable';
    message.loading({content: 'Updating...', key});
    console.log("value", moment(values.dob).format(dateFormat));
    let mess;
    setTimeout(async () => {
      await ApiService.updateInfo({
        full_name: values.full_name,
        display_name: values.display_name,
        gender: values.gender,
        dob: moment(values.dob).format(dateFormat),
        bio: values.bio
      }).then(response => {
        console.log(response)
        mess = response.message;
        console.log("Message", message)
      }).catch(error => {
        console.log(error)
      })
      message.success({content: mess, key, duration: 2})
    }, 1000);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const dispatch = useDispatch();

  const onUploadAvatar = async info => {
    if (info['file']['status'] === "done") {
    }
  };

  const onRemoveAvatar = () => {
    // this.setState({
    //     avatarUrl: ''
    // })
  }

  return (
    <>
      <Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
        <Avatar size={90} src={userInfo.avatar} icon={<UserOutlined/>}/>
        <div className="ml-3 mt-md-0 mt-3">
          <ImgCrop rotate>
            <Upload onChange={onUploadAvatar} showUploadList={false}
                    action={API_BASE_URL + "/api/setAvatar"}
                    headers={{
                      "x-access-token": localStorage.getItem("auth_token")
                    }}
            >
              <Button type="primary">Change Avatar</Button>
            </Upload>
          </ImgCrop>
          <Button className="ml-2" onClick={onRemoveAvatar}>Remove</Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          // initialValues={
          //     {
          //         'username': userInfo.username,
          //         'email': userInfo.email,
          //         'full_name': userInfo.fullName,
          //         'display_name': userInfo.displayName,
          //         // 'dob': userInfo.dob,
          //         'gender': userInfo.gender,
          //         'bio': userInfo.bio,
          //     }
          // }
          fields={[
            {
              name: 'username',
              value: userInfo.username
            },
            {
              name: 'email',
              value: userInfo.email
            },
            {
              name: 'full_name',
              value: userInfo.fullName
            },
            {
              name: "gender",
              value: userInfo.gender
            },
            {
              name: 'dob',
              value: moment(userInfo.dob, dateFormat)
            },
            {
              name: "bio",
              value: userInfo.bio
            }
          ]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>

              <Row gutter={ROW_GUTTER}>
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
                    <Input disabled/>
                  </Form.Item>
                </Col>
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
                    <Input disabled/>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item
                    label="Name"
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
              </Row>


              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="dob"
                    label="Birthday"
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
                      <option value="0">Male</option>
                      <option value="1">Female</option>
                      <option value="2">Other</option>
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
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )

}

export default EditProfile
