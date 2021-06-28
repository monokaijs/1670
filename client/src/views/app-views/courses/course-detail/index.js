import React, {useEffect, useState} from "react";
import {
  useParams
} from "react-router-dom";
import ApiService from "../../../../services/ApiService";
import {PageHeaderAlt} from "../../../../components/layout-components/PageHeaderAlt";
import Flex from "../../../../components/shared-components/Flex";
import {Button, Card, Row, Col, Comment, Radio, Skeleton, Tag, Timeline} from "antd";
import {
  ClockCircleOutlined,
  CloudDownloadOutlined,
  UserOutlined,
  TagOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import AvatarStatus from "../../../../components/shared-components/AvatarStatus";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import {useSelector} from "react-redux";
import NewActivityModal from "../../../../components/course-compoments/NewActivityModal";
import NewMaterialForm from "../../../../components/course-compoments/NewMaterialForm";

const MyCourse = (props) => {
  let {courseId} = useParams();
  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {userInfo} = useSelector(state => state.auth);
  const [newActivityForm, setNewActivityForm] = useState(false);
  const [newMaterialForm, setNewMaterialForm] = useState(false);

  useEffect(() => {
    ApiService.loadCourseInfo({
      course_id: courseId
    }).then(response => {
      setIsLoading(false);
      setCourse(response);
    });
  }, []);
  const handleNewActivityForm = () => {
     setNewActivityForm(true);
  }
  const closeNewActivityForm = () => {
    setNewActivityForm(false);
  }

  const handleNewMaterialForm = () => {
    setNewMaterialForm(true);
  }
  const closeNewMaterialForm = () => {
    setNewMaterialForm(false);
  }

  return (
    <>
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex justifyContent="between" alignItems="center" className="py-4">
            <h2>{course.title}</h2>
            <div>
              <UserOutlined/> {course.tutor?.fullName}
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="container mt-4">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <Card
              title="Timeline"
              extra={<>
                {userInfo.role === "trainer" && (
                  <>
                    <Button onClick={handleNewActivityForm}>
                      <PlusSquareOutlined /> New Activity
                    </Button>
                    <Button className="ml-2" onClick={handleNewMaterialForm}>
                      <FileTextOutlined/> New Material
                    </Button>
                  </>
                )}
              </>}
            >
              <Skeleton loading={isLoading} paragraph={{
                rows: 2
              }}/>
              <div className="mt-4">
                <Timeline>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                  <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />} color="red">
                    Technical testing 2015-09-01
                  </Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
              </div>
              <h4>Course Materials</h4>
              <Row>
                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                  <Card
                    actions={[
                      <CloudDownloadOutlined key="download" />,
                      <EditOutlined key="edit" />,
                    ]}
                  >
                    <Skeleton loading={false} avatar active>
                      <Meta
                        avatar={
                          <Avatar icon={<FileTextOutlined />} />
                        }
                        title="Tony's book for computing purposes"
                        description="3.6MB"
                      />
                    </Skeleton>
                  </Card>
                </Col>
              </Row>
            </Card>
            <Card
              type="inner"
            >
              activity
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Card
              title="About"
              extra={<>
                {userInfo.role === "trainer" && (
                  <>
                    <Button>
                      <EditOutlined/> Edit
                    </Button>
                  </>
                )}
              </>}
            >
              {!isLoading && (
                <div>
                  <div style={{marginBottom: 20}}>
                    <Tag>
                      <TagOutlined/>
                      <span className="ml-2 font-weight-semibold">{course.category?.name}</span>
                    </Tag>
                  </div>
                </div>
              )}
              <p>
                {course?.description}
              </p>
            </Card>
            <Card
              title="Trainees"
            >
              <div className="mt-3">
                {
                  course.trainees?.map((trainee, i) => (
                    <div key={i} className={`d-flex align-items-center justify-content-between mb-4`}>
                      <AvatarStatus id={i} src={trainee.avatar} name={trainee.fullName} subTitle={"@" + trainee.username}/>
                    </div>
                  ))
                }
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <NewActivityModal visible={newActivityForm} onClose={closeNewActivityForm}/>
      <NewMaterialForm visible={newMaterialForm} onClose={closeNewMaterialForm}/>
    </>
  )
}
export default MyCourse;
