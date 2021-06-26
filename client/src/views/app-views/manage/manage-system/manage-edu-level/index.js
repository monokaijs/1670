import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditEduLevelForm from "./EditEduLevelForm";
import ApiService from "../../../../../services/ApiService";

const {Search} = Input;
const {confirm} = Modal;

const ManageEduLevel = () => {
  const [onAdd, setOnAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedEduLevel, setSelectedEduLevel] = useState(null)
  const tableColumns = [
    {
      title: "ID",
      dataIndex: "edu_id",
      align: "center",
      render: record => {
        return (
          <p>{record}</p>
        )
      },
    },
    {
      title: "Edu Level",
      dataIndex: "edu_level",
      align: "center",
      render: record => {
        return (
          <p>{record}</p>
        )
      },
    },
    {
      title: "Creation Time",
      dataIndex: "creation_time",
      align: "center",
      render: record => {
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
                      onClick={() => showDeleteConfirm(record.edu_id)}
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
  const showEditForm = (edu_level, type = "edit") => {
    if (type === "add") {
      setOnAdd(true)
    }
    setSelectedEduLevel(edu_level);
    setVisible(true);
  }

  const showDeleteConfirm = (edu_id) => {
    confirm({
      title: "Are you sure to delete this edu level?",
      content: "This action cannot be undone, are you sure you want to delete this edu level?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        //   Call API
        await ApiService.deleteEduLevel({
          edu_id: edu_id
        }).then(response => {

        })
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }
  const data = [{
    edu_id: 1,
    edu_level: "Dai Hoc",
    creation_time: "2020/06/04"
  }]
  return (
    <>
      <div className="search-bar mb-4 d-flex justify-content-between">
        <Button type="primary" onClick={() => {
          showEditForm({}, 'add')
        }}>Add Edu Level</Button>
        <Search placeholder="Input search text" style={{width: 400}} enterButton/>
      </div>
      <Card bodyStyle={{'padding': '8px'}}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={data} rowKey='id'/>
        </div>
      </Card>
      {selectedEduLevel &&
      <EditEduLevelForm eduLevel={selectedEduLevel} onAdd={onAdd} visible={visible} onClose={closeEditForm}/>}
    </>
  )
}

export default ManageEduLevel