import React, {useState} from 'react'
import {Avatar, Button, Card, Col, Menu, Progress, Radio, Row, Tag, Tooltip} from 'antd';
import {
  CheckCircleOutlined,
  UserOutlined,
  TagOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import utils from 'utils';
import {COLORS} from 'constants/ChartConstant';
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'

const VIEW_LIST = 'LIST';
const VIEW_GRID = 'GRID';

const ItemAction = ({id, removeId}) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key="0">
          <EyeOutlined/>
          <span>View</span>
        </Menu.Item>
        <Menu.Item key="1">
          <EditOutlined/>
          <span>Edit</span>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2" onClick={() => removeId(id)}>
          <DeleteOutlined/>
          <span>Delete Project</span>
        </Menu.Item>
      </Menu>
    }
  />
)

const ItemHeader = ({name, description}) => (
  <div>
    <h4 className="mb-0">{name}</h4>
    <span className="text-muted short-description">{description}</span>
  </div>
)

const ItemInfo = ({category, tutor, statusColor}) => (
  <Flex alignItems="center">
    {/*<div className="mr-3">*/}
    {/*  <Tooltip title="Attachment">*/}
    {/*    <PaperClipOutlined className="text-muted font-size-md"/>*/}
    {/*    <span className="ml-1 text-muted">{category}</span>*/}
    {/*  </Tooltip>*/}
    {/*</div>*/}
    <div>
      <Tag className={statusColor === "none" ? 'bg-gray-lightest' : ''}
           color={statusColor !== "none" ? statusColor : ''}>
        <UserOutlined />
        <span className="ml-2 font-weight-semibold">{tutor}</span>
      </Tag>
      <Tag className={statusColor === "none" ? 'bg-gray-lightest' : ''}
           color={statusColor !== "none" ? statusColor : ''}>
        <TagOutlined />
        <span className="ml-2 font-weight-semibold">{category}</span>
      </Tag>
    </div>
  </Flex>
)

const ItemProgress = ({progression}) => (
  <Progress percent={progression} strokeColor={getProgressStatusColor(progression)} size="small"/>
)

const ItemMember = ({member}) => (
  <>
    {member.map((elm, i) => (
      i <= 2 ?
        <Tooltip title={elm.name} key={`avatar-${i}`}>
          <Avatar size="small" className={`ml-1 cursor-pointer ant-avatar-${elm.avatarColor}`} src={elm.img}>
            {elm.img ? '' : <span className="font-weight-semibold font-size-sm">{utils.getNameInitial(elm.name)}</span>}
          </Avatar>
        </Tooltip>
        :
        null
    ))}
    {member.length > 3 ?
      <Tooltip title={`${member.length - 3} More`}>
        <Avatar size={25} className="ml-1 cursor-pointer bg-white border font-size-sm">
          <span className="text-gray-light font-weight-semibold">+{member.length - 3}</span>
        </Avatar>
      </Tooltip>
      :
      null
    }
  </>
)

const ListItem = ({course, removeId}) => (
  <div className="bg-white rounded p-3 mb-3 border">
    <Row align="middle">
      <Col xs={24} sm={24} md={11}>
        <ItemHeader name={course.title} description={course.description}/>
      </Col>
      <Col xs={24} sm={24} md={6}>
        <ItemInfo
          category = {course.category}
          tutor ={course.tutor}
        />
      </Col>
      <Col xs={24} sm={24} md={3}>
        {/*<div className="ml-0 ml-md-3">*/}
        {/*  <ItemMember member={data.member}/>*/}
        {/*</div>*/}
      </Col>
      <Col xs={24} sm={24} md={1} offset={3}>
        <div className="text-right">
          <ItemAction id={course.id}/>
        </div>
      </Col>
    </Row>
  </div>
)

const GridItem = ({course, removeId}) => {
  return (
    <Card>
      <Flex alignItems="center" justifyContent="between">
        <ItemHeader name={course.title} description={course.description}/>
        <ItemAction id={course.id} removeId={removeId}/>
      </Flex>
      <div className="mt-2">
        <ItemInfo
          category = {course.category}
          tutor={course.tutor}
        />
      </div>
    </Card>
  )
}

const getProgressStatusColor = progress => {
  if (progress >= 80) {
    return COLORS[1]
  }
  if (progress < 60 && progress > 30) {
    return COLORS[3]
  }
  if (progress < 30) {
    return COLORS[2]
  }
  return COLORS[0]
}

const CourseCard = ({key, course, viewMode}) => {
  if (viewMode === "LIST") {
    return (
      <ListItem course={course}/>
    )
  } else {
    return (
      <Col xs={24} sm={24} lg={8} xl={8} xxl={6}>
        <GridItem course={course}/>
      </Col>
    )
  }
}

export default CourseCard;
