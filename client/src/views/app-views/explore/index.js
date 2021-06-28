import React, {useEffect, useState} from 'react';
import {Button, Card, Col, notification, Pagination, Radio, Row, Skeleton, Spin, Tabs} from 'antd';
import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons"
import {useSelector} from "react-redux";
import {PageHeaderAlt} from "../../../components/layout-components/PageHeaderAlt";
import Flex from "../../../components/shared-components/Flex";
import CourseCard from "../../../components/course-compoments/CourseCard";
import ApiService from "../../../services/ApiService";

const VIEW_GRID = 'GRID';
const VIEW_LIST = 'LIST';

const CourseList = () => {
  const [view, setView] = useState("GRID")
  const [allCourses, setAllCourses] = useState([]);

  const userInfo = useSelector(state => state.auth.userInfo);

  useEffect(() => {
    ApiService.loadAllCourses().then(response => {
      setAllCourses(response['courses']);
    })
  }, []);

  const onChangeView = (e) => {
    setView(e.target.value);
  }
  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-4">
            <h2>Explore</h2>
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
            {allCourses.map((course, id) => (
              <CourseCard accessible={false} done={true} key={id} course={course} viewMode={view}/>
            ))}
          </>
        ) : (
          <>
            <Row gutter={16}>
              {allCourses.map((course, id) => (
                <CourseCard accessible={false} done={true} key={id} course={course} viewMode={view}/>
              ))}
            </Row>
          </>
        )}
      </div>
    </>
  )
}
export default CourseList;
