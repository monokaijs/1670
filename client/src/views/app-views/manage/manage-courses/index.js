import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditCourseForm from "./EditCourseForm";
import ApiService from "../../../../services/ApiService";

const {Search} = Input;
const {confirm} = Modal;
const ManageCourses = () => {
  const [visible, setVisible] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pageSize] = useState(10);

  const loadCourses = (pageSize, currentPage) => {
    ApiService.loadCourses({
      page_size: pageSize,
      cursor: pageSize*currentPage
    })
  }

  useEffect(() => {
    loadCourses(pageSize, 0)
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

  const tableColumns = [
    {
      title: "Course Name",
      dataIndex: "course_name",
      align: "center",
      render: (record) => {
        return (
          <p>{record}</p>
        )
      },
    },
    {
      title: "Tutor",
      dataIndex: "tutor",
      align: "center",
      render: (record) => {
        return (
          <p>{record}</p>
        )
      },
    },
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
      title: "Creation Time",
      dataIndex: "creation_time",
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
  const data = [{
    id:1,
    course_name: "Data Structure",
    tutor: "Nguyen Thu Thuy",
    category: "COMP46",
    creation_time: "2020/06/04",
    description: "Here!"
  }]
  return(
    <>
      <div className="search-bar mb-4 d-flex justify-content-between">
        <Button type="primary" onClick={()=>{
          showEditForm({}, 'add')
        }}>Add Course</Button>
        <Search placeholder="Input search text" style={{width: 400}} enterButton/>
      </div>
      <Card bodyStyle={{'padding': '8px'}}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={data} rowKey='id'/>
        </div>
      </Card>
      <EditCourseForm course={selectedCourse} onAdd={onAdd} visible={visible} onClose={closeEditForm}/>
    </>

  )
};

export default ManageCourses;
