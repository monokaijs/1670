import React, {useEffect, useState} from 'react';
import {Button, Card, Table, Tooltip, Input, Spin} from "antd";
import SpecificCourse from "./specific-course";

const {Search} = Input;
const AssignCourse = ({match}) => {
	const [onAssign, setOnAssign] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState(null)


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
			title: 'Action',
			dataIndex: 'actions',
			align: "center",
			render: (_, record) => {
				return (
					<div className="text-right d-flex justify-content-center">
						<Tooltip title="Assign">
							<Button  className="mr-2" danger size="small" onClick={() => handleAssign(record)}>Assign</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]

	useEffect(() => {
		console.log({
			onAssign
		})
	},[onAssign])

	const data = [{
		id: 1,
		course_name: "Data Structure",
		tutor: "Nguyen Thu Thuy",
		category: "COMP46",
		creation_time: "2020/06/04",
		description: "Here!"
	}]
	return (
		<>
			<div className="search-bar mb-4 d-flex justify-content-end">
				<Search placeholder="Input search text" style={{width: 400}} enterButton/>
			</div>
			{!onAssign ? (
				<Card bodyStyle={{'padding': '8px'}}>
					<div className="table-responsive">
						<Table columns={tableColumns} dataSource={data} rowKey='id'/>
					</div>
				</Card>
			):(
				<>
					{selectedCourse ? (
						<SpecificCourse selectedCourse = {selectedCourse} setOnAssign = {setOnAssign} />
					) : (
						<Spin tip="Loading..."/>
					)}
				</>
			)}
		</>
	)
}

export default AssignCourse;