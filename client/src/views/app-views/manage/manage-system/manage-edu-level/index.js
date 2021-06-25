import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditEduLevelForm from "./EditEduLevelForm";

const {Search} = Input;
const {confirm} = Modal;

const ManageEduLevel = () => {
  const [onAdd, setOnAdd] = useState(false);
  const [visible, setVisible] = useState(false);

  const tableColumns = [
    {
      title: "Edu Level",
      dataIndex: "edu_level",
      align: "center",
      render: record => {
        return (
          <p>Dai Hoc</p>
        )
      },
    },
    {
      title: "Creation Time",
      dataIndex: "creation_time",
      align: "center",
      render: record => {
        return (
          <p>2020/06/04</p>
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
  const closeEditForm = () => {
    setOnAdd(false);
    setVisible(false);
  }
  const showEditForm = (edu_level, type="edit") => {
     if(type==="add"){
       setOnAdd(true)
    }
     setVisible(true);
  }

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure to delete this edu level?",
      content: "This action cannot be undone, are you sure you want to delete this edu level?",
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
  const data = [{
    id: 1
  }]
  return(
    <>
      <div className="search-bar mb-4 d-flex justify-content-between">
        <Button type="primary" onClick={()=>{
          showEditForm({}, 'add')
        }}>Add Edu Level</Button>
        <Search placeholder="Input search text" style={{width: 400}} enterButton/>
      </div>
      <Card bodyStyle={{'padding': '8px'}}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={data} rowKey='id'/>
        </div>
      </Card>
      <EditEduLevelForm onAdd={onAdd} visible={visible} onClose={closeEditForm}/>
    </>
  )
}
export default ManageEduLevel