import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditUserForm from "./EditUserForm";
import ApiService from "../../../../services/ApiService";

const {Search} = Input;
const {confirm} = Modal;
const ManageAccounts = () => {
  const [users, setUser] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [visible, setVisible] = useState(false);
  const [onAdd, setOnAdd] = useState(false)

  const loadAccounts = (pageSize, currentPage) => {
    ApiService.loadAccounts({
       page_size: pageSize,
      currentPage: currentPage*pageSize
    })
  }

  useEffect(() => {
    loadAccounts(pageSize, 0)
  }, [])
  const showEditForm = (user, type="edit") => {
    if(type==='add'){
      setOnAdd(true)
    }
    setVisible(true);
  }
  const closeEditForm = () => {
    setVisible(false);
    setOnAdd(false)

  }

  const openFormAddUser = () => {
    setOnAdd(true);
    setVisible(true);
  }

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure to delete this user?",
      content: "This action cannot be undone, are you sure you want to delete this user?",
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

  const tableColumns = [
    {
      title: "Fullname",
      dataIndex: "full_name",
      align: "center",
      render: record => {
        return (
          <p>Nguyen Thu Thuy</p>
        )
      },
    },
    {
      title: "Username",
      dataIndex: "userName",
      align: "center",
      render: record => {
        return (
          <p>conongchamchi</p>
        )
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      render: record => {
        return (
          <p>haducc@gmail.com</p>
        )
      },
    },
    {
      title: "DOB",
      dataIndex: "time",
      align: "center",
      render: record => {
        return (
          <p>2020/008/20</p>
        )
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      render: record => {
        return (
          <p>Admin</p>
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
                      onClick={() => showDeleteConfirm()}
                      size="small"/>
            </Tooltip>
          </div>
        )
      }
    }
  ]
  const data = [{
    id: 1
  }]
  return(
    <>
      <div className="search-bar mb-4 d-flex justify-content-between">
        <Button type="primary" onClick={()=>{
          showEditForm({}, 'add')
        }}>Add Account</Button>
        <Search placeholder="Input search text" style={{width: 400}} enterButton/>
      </div>
      <Card bodyStyle={{'padding': '8px'}}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={data} rowKey='id'/>
        </div>
      </Card>
      <EditUserForm onAdd={onAdd} visible={visible} onClose={closeEditForm}/>
    </>

  )
};
export default ManageAccounts;
