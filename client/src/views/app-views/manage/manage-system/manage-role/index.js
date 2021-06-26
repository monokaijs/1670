import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditRoleForm from "./EditRoleForm";
import {useSelector} from "react-redux";
import ApiService from "../../../../../services/ApiService";

const {Search} = Input;
const {confirm} = Modal;

const ManageRole = () => {
  const [onAdd, setOnAdd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const systemConfig = useSelector(state => state.config.system);
  console.log(systemConfig);

  const tableColumns = [
    {
      title: "Slug",
      dataIndex: "slug",
      align: "center",
      render: record => {
        return (
          <p>{record}</p>
        )
      },
    },
    {
      title: "Title",
      dataIndex: "title",
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
                      onClick={() => showEditForm(record.slug)}
                      size="small"/>
            </Tooltip>
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined/>}
                      onClick={() => showDeleteConfirm(record.slug)}
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
  const showEditForm = (slug, type="edit") => {
    setSelectedRole(slug)
    if(type==="add"){
      setOnAdd(true)
    }
    setVisible(true);
  }

  const showDeleteConfirm =  (role) => {
    confirm({
      title: "Are you sure to delete this role?",
      content: "This action cannot be undone, are you sure you want to delete this role?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        //   Call API
        await ApiService.deleteRole({
          slug: role
        }).then(response => {

        })
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }
  const data = systemConfig.roles;
  return(
    <>
      <div className="search-bar mb-4 d-flex justify-content-between">
        <Button type="primary" onClick={()=>{
          showEditForm({}, 'add')
        }}>Add Role</Button>
        <Search placeholder="Input search text" style={{width: 400}} enterButton/>
      </div>
      <Card bodyStyle={{'padding': '8px'}}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={data} rowKey='slug'/>
        </div>
      </Card>
      {selectedRole &&  <EditRoleForm role={selectedRole} onAdd={onAdd} visible={visible} onClose={closeEditForm}/>}
    </>
  )
}
export default ManageRole;
