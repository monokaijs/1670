import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal, Spin, notification} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined} from "@ant-design/icons";
import EditCourseForm from "./EditCourseForm";
import ApiService from "../../../../services/ApiService";
import {useSelector} from "react-redux";
import SpecificCourse from "../assign-course/specific-course";
import continuous from "d3-scale/src/continuous";
const {Search} = Input;
const {confirm} = Modal;

const ManageCourses = () => {
  const [visible, setVisible] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pageSize] = useState(10);
  const [onAssign, setOnAssign] = useState(false);
  const [trainees, setTrainees] = useState(null);
  const [trainers, setTrainers] = useState(null)
  const [courses, setCourses] = useState([]);

  const systemConfig = useSelector(state => state.config.system);

  const loadCourses = (pageSize, currentPage) => {
    ApiService.loadCourses({
      page_size: pageSize,
      cursor: pageSize*currentPage
    }).then(response => {
      setCourses(response.courses);
    })
  }

  const loadAccounts = (pageSize, currentPage) => {
    ApiService.loadAccounts({
      page_size: pageSize,
      current_page: currentPage * pageSize
    }).then(response => {
      let trainerAccount = [];
      let traineeAccount = [];
      response.accounts.forEach(account => {
        if(account.role === "trainee") {
          traineeAccount.push(account)
        } else if(account.role === "trainer") {
          trainerAccount.push(account)
        } else {
          continuous();
        }
      })
      setTrainees(traineeAccount);
      setTrainers(trainerAccount)
      console.log({
        traineeAccount,
        trainerAccount
      })
      let trainer = response.accounts.filter((account) => {
        return account.role === "trainee"
      })

    })
  }

  useEffect(() => {
    loadCourses(pageSize, 0)
    loadAccounts(pageSize, 0)
  }, [])

  const showEditForm = (course, type="edit") => {
    if(type==="add") {
      setOnAdd(true)
    }
    setSelectedCourse(course);
    setVisible(true);
  }

  const closeEditForm = () => {
    setOnAdd(false)
    setVisible(false);
  }


  const showDeleteConfirm = (course_id) => {
    confirm({
      title: "Are you sure to delete this course?",
      content: "This action cannot be undone, are you sure you want to delete this course?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
      //   Call API
        await ApiService.deleteCourse({
          course_id: course_id
        }).then(response => {
          if(!response.error) {
            notification.success({
              message: response.message
            })
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }
  useEffect(() => {
    console.log(visible)
  },[visible])

  const handleAssign = (course) => {
    console.log({
      course
    })
    console.log('cHECK')
    setSelectedCourse(course)
    setOnAssign(true);
  }

  const tableColumns = [
    {
      title: "Course Name",
      dataIndex: "title",
      align: "center",
      render: (record) => {
        return (
          <p>{record}</p>
        )
      },
    },
    // {
    //   title: "Tutor",
    //   dataIndex: "tutor",
    //   align: "center",
    //   render: (record) => {
    //     return (
    //       <p>{record}</p>
    //     )
    //   },
    // },
    {
      title: "Category",
      dataIndex: "category",
      align: "center",
      render: (record) => {
        return (
          <p>{record}</p>
        )
      },
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      align: "center",
      render: (_, record) => {
        return (
          <div className="text-right d-flex justify-content-center">
            <Tooltip title="View">
              <Button type="primary" className="mr-2" icon={<EyeOutlined/>}
                // onClick={() => {showUserInfo(record)}}
                      size="small"/>
            </Tooltip>
            <Tooltip title="Edit">
              <Button success="true" className="mr-2" icon={<EditOutlined/>}
                      onClick={() => showEditForm(record)}
                      size="small"/>
            </Tooltip>
            <Tooltip title="Assign Course" className="mr-2">
              <Button icon={<UserAddOutlined/>} style={{
                color: "#039935",
                borderColor: "#039935",
              }} size="small" onClick={() => handleAssign(record)}/>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined/>}
                onClick={() => showDeleteConfirm(record.id)}
                      size="small"/>
            </Tooltip>
          </div>
        )
      }
    }
  ]
  return(
    <>
      <div className={"search-bar mb-4 d-flex justify-content-between"}>
        {!onAssign ? (
         <>
           <Button type="primary" onClick={()=>{
             showEditForm({}, 'add')
           }}>Create Course</Button>
           <Search placeholder="Input search text" style={{width: 400}} enterButton/>
         </>
        ): (
          <h4>Assign Course</h4>
          )}
      </div>
      {!onAssign ? (
        <Card bodyStyle={{'padding': '8px'}}>
          <div className="table-responsive">
            <Table columns={tableColumns} dataSource={courses} rowKey='id'/>
          </div>
        </Card>
      ):(
        <>
          {selectedCourse && trainees && trainers ? (
            <SpecificCourse trainers={trainers} trainees={trainees} selectedCourse = {selectedCourse} setOnAssign = {setOnAssign} />
          ) : (
            <Spin tip="Loading..."/>
          )}
        </>
      )}
      {selectedCourse && (
        <EditCourseForm course={selectedCourse} onAdd={onAdd} visible={visible} onClose={closeEditForm}/>
      )}
    </>

  )
};

export default ManageCourses;
