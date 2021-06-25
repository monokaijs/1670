import React, {useState} from 'react';
import {PageHeaderAlt} from "../../../../components/layout-components/PageHeaderAlt";
import {Button, Card, Col, notification, Pagination, Radio, Row, Skeleton, Spin, Tabs} from 'antd';
import Flex from "../../../../components/shared-components/Flex";
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons"
import CourseCard from "../../../../components/course-compoments/CourseCard";
import "./custom.css"

const VIEW_GRID = 'GRID';
const VIEW_LIST = 'LIST';
const courses = [{
  id: 1,
  course_name: "Data Structure",
  tutor: "Nguyen Thu Thuy",
  creation_time: "2020/06/04",
  category: "COMP1426",
  description: "Coursera Inc. is an American massive open online course provider founded in 2012 by Stanford University computer science professors Andrew Ng and Daphne Koller!"
}]
const CourseList = () => {
  const [view, setView] = useState("GRID")

  const onChangeView = () => {
    setView("LIST")
  }
  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-4">
            <h2>Course List</h2>
            <div>
              <Radio.Group defaultValue={VIEW_GRID} onChange={e => onChangeView(e)}>
                <Radio.Button value={VIEW_GRID}><AppstoreOutlined/></Radio.Button>
                <Radio.Button value={VIEW_LIST}><UnorderedListOutlined/></Radio.Button>
              </Radio.Group>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="container my-4">
        {view === VIEW_LIST ? (
          <>
            {courses.map((course, id) => (
              <CourseCard done={true} key={id} course={course} viewMode={view}/>
            ))}
          </>
        ) : (
          <>
            <Row gutter={16}>
              {courses.map((course, id) => (
                <CourseCard done={true} key={id} course={course} viewMode={view}/>
              ))}
            </Row>
          </>
        )}
      </div>
    </>
  )
}
export default CourseList;