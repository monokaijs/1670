import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditCourseForm from "./EditCourseForm";

const {Search} = Input;
const {confirm} = Modal;
const ManageCourses = () => {
  const [visible, setVisible] = useState(false);

  const showEditForm = (record) => {
    console.log("Check");
    setVisible(true);
  }

  const closeEditForm = () => {
    setVisible(false);
  }

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure to delete this course?",
      content: "This action cannot be undone, are you sure you want to delete this course?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
      //   Call API
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
      dataIndex: "name",
      align: "center",
      render: record => {
        return (
          <p>Data Structure</p>
        )
      },
    },
    {
      title: "Tutor",
      dataIndex: "tutor",
      align: "center",
      render: record => {
        return (
          <p>Nguyen Thu Thuy</p>
        )
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      align: "center",
      render: record => {
        return (
          <p>Information Technology</p>
        )
      },
    },
    {
      title: "Creation Time",
      dataIndex: "time",
      align: "center",
      render: record => {
        return (
          <p>2020/008/20</p>
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
                      onClick={() => showEditForm()}
                      size="small"/>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined/>}
                onClick={() => showDeleteConfirm()}
                      size="small"/>
            </Tooltip>
          </div>
        )
      }
    }
  ]
  const data = [1]
  return(
    <>
      <div className="search-bar mb-4 d-flex justify-content-end">
        <Search placeholder="Input search text" style={{width: 400}} enterButton/>
      </div>
      <Card bodyStyle={{'padding': '8px'}}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={data} rowKey='id'/>
        </div>
      </Card>
      <EditCourseForm visible={visible} onClose={closeEditForm}/>
    </>

  )
};

export default ManageCourses;
