import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import EditUserForm from "./EditUserForm";
import ApiService from "../../../../services/ApiService";

const {Search} = Input;
const {confirm} = Modal;
const ManageAccounts = () => {
	const [accounts, setAccounts] = useState(null);
	const [pageSize, setPageSize] = useState(10);
	const [visible, setVisible] = useState(false);
	const [onAdd, setOnAdd] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(null)

	const loadAccounts = (pageSize, currentPage) => {
		ApiService.loadAccounts({
			page_size: pageSize,
			current_page: currentPage * pageSize
		}).then(response => {
		  setAccounts(response.accounts);
    })
	}

	useEffect(() => {
		loadAccounts(pageSize, 0)
	}, [])
	const showEditForm = (account, type = "edit") => {
		if (type === 'add') {
			setOnAdd(true)
		}
		setSelectedAccount(account)
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

	const showDeleteConfirm = (username) => {
		confirm({
			title: "Are you sure to delete this user?",
			content: "This action cannot be undone, are you sure you want to delete this user?",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				//   Call API
				await ApiService.deleteAccount({
					username: username
				}).then(response => {

				})
			},
			onCancel() {
				console.log('Cancel');
			}
		})
	}

	const tableColumns = [
		{
			title: "Full name",
			dataIndex: "fullName",
			align: "center",
			render: record => {
				return (
					<p>{record}</p>
				)
			},
		},
		{
			title: "Username",
			dataIndex: "username",
			align: "center",
			render: record => {
				return (
					<p>{record}</p>
				)
			},
		},
		{
			title: "Email",
			dataIndex: "email",
			align: "center",
			render: record => {
				return (
					<p>{record}</p>
				)
			},
		},
		{
			title: "Role",
			dataIndex: "role",
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
											onClick={() => showDeleteConfirm(record.username)}
											size="small"/>
						</Tooltip>
					</div>
				)
			}
		}
	]
  return (
		<>
			<div className="search-bar mb-4 d-flex justify-content-between">
				<Button type="primary" onClick={() => {
					showEditForm({}, 'add')
				}}>Add Account</Button>
				<Search placeholder="Input search text" style={{width: 400}} enterButton/>
			</div>
			<Card bodyStyle={{'padding': '8px'}}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={accounts} rowKey='id'/>
				</div>
			</Card>
			{selectedAccount &&
			<EditUserForm account={selectedAccount} onAdd={onAdd} visible={visible} onClose={closeEditForm}/>}
		</>

	)
};
export default ManageAccounts;
