import React, {useEffect, useState} from "react";
import {Button, Card, Table, Tooltip, Input, Modal} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import ApiService from "../../../../services/ApiService";
import EditCategoryForm from "./EditCategoryForm";

const {Search} = Input;
const {confirm} = Modal;
const ManageCategories = () => {
	const [visible, setVisible] = useState(false);
	const [onAdd, setOnAdd] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [pageSize] = useState(10);

	const loadCategory = (pageSize, currentPage) => {
		ApiService.loadCourses({
			page_size: pageSize,
			cursor: pageSize*currentPage
		})
	}

	useEffect(() => {
		loadCategory(pageSize, 0)
	}, [])

	const showEditForm = (category, type="edit") => {
		console.log("Hello")
		if(type==="add") {
			setOnAdd(true)
		}
		setSelectedCategory(category);
		setVisible(true);
	}

	const closeEditForm = () => {
		setOnAdd(false)
		setVisible(false);
	}

	const showDeleteConfirm = (category_id) => {
		confirm({
			title: "Are you sure to delete this category?",
			content: "This action cannot be undone, are you sure you want to delete this category?",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			async onOk() {
				//   Call API
				await ApiService.deleteCategory({
					category_id: category_id
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
			title: "Category Name",
			dataIndex: "category_name",
			align: "center",
			render: (record) => {
				return (
					<p>{record}</p>
				)
			},
		},
		{
			title: "Code",
			dataIndex: "code",
			align: "center",
			render: (record) => {
				return (
					<p>{record}</p>
				)
			},
		},
		{
			title: "Create Time",
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
		category_name: "Data Structure",
		code: "COMP46",
		creation_time: "2020/06/04",
		description: "Here!"
	}]
	return(
		<>
			<div className="search-bar mb-4 d-flex justify-content-between">
				<Button type="primary" onClick={()=>{
					showEditForm({}, 'add')
				}}>Add Category</Button>
				<Search placeholder="Input search text" style={{width: 400}} enterButton/>
			</div>
			<Card bodyStyle={{'padding': '8px'}}>
				<div className="table-responsive">
					<Table columns={tableColumns} dataSource={data} rowKey='id'/>
				</div>
			</Card>
			{
				selectedCategory && (
					<EditCategoryForm category={selectedCategory} onAdd={onAdd} visible={visible} onClose={closeEditForm}/>
				)
			}

		</>
	)
};

export default ManageCategories;
