import React, {useState} from 'react';
import {PageHeaderAlt} from "../../../../components/layout-components/PageHeaderAlt";
import {Button, Card, Col, notification, Pagination, Radio, Row, Skeleton, Spin, Tabs} from 'antd';
import Flex from "../../../../components/shared-components/Flex";
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons"
import CourseCard from "../../../../components/course-compoments/CourseCard";
import "./custom.css"
import {useSelector} from "react-redux";

const VIEW_GRID = 'GRID';
const VIEW_LIST = 'LIST';

const CourseList = () => {
  const [view, setView] = useState("GRID")

  const userInfo = useSelector(state => state.auth.userInfo);

  const onChangeView = (e) => {
    setView(e.target.value);
  }
  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-4">
            <h2>My Courses</h2>
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
            {userInfo?.myCourses?.map((course, id) => (
              <CourseCard accessible={true} done={true} key={id} course={course} viewMode={view}/>
            ))}
          </>
        ) : (
          <>
            <Row gutter={16}>
              {userInfo?.myCourses?.map((course, id) => (
                <CourseCard accessible={true} done={true} key={id} course={course} viewMode={view}/>
              ))}
            </Row>
          </>
        )}
      </div>
    </>
  )
}
export default CourseList;
