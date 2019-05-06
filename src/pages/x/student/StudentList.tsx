import React, { Component } from 'react';
import { Layout, Row, Col, Input, Select, Button, Table, Pagination } from 'antd';
import './Student.less';
import { Location, History } from 'history';
import { queryStudent, StudentInfo } from '../../../api/queryStudent';
import { getStudentListColumns } from '../../../constants/studentListColumns';
import { colStyle, span } from '../../../constants/searchRowCol';

interface IStudentListProps {
	location: Location;
	history: History;
}

interface IStudentListState {
	studentList: StudentInfo[];
	total: number;
	page: number;
	rows: number;
	loading?: boolean;
}

class StudentList extends Component<IStudentListProps, Readonly<IStudentListState>> {
	readonly state: IStudentListState = {
		studentList: [],
		page: 1,
		rows: 20,
		total: 0,
    }
    
    /**
     * 渲染表格
     */
	public renderTable() {
		const { studentList } = this.state
		return (
			<div className="student-list-table">
				<Table
					rowKey="stuId"
					rowSelection={{
						onChange: (e) => {
							console.log(e)
						}
					}} 
					pagination={false}
					scroll={{x: 1300, y: 300}}
					size="small"
					columns={getStudentListColumns.call(this)}
					dataSource={studentList}
					loading={this.state.loading}
				/>
			</div>
		)
	}

	public render() {
		return (
			<Layout className="student-list-page">
				<Row 
					gutter={16}
				>
					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Input placeholder="姓名" type="text" />
					</Col>
					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Input placeholder="QQ" type="text" />
					</Col>

					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Input placeholder="电话" type="text" />
					</Col>

					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Select
							style={{
								width:'100%'
							}}
							placeholder="选择阶段"
						>
							<Select.Option value="x">xx</Select.Option>
						</Select>
					</Col>

					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Select
							style={{
								width:'100%'
							}}
							placeholder="选择班级"
						>
							<Select.Option value="x">xx</Select.Option>
						</Select>
					</Col>

					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Select
							style={{
								width:'100%'
							}}
							placeholder="选择助教"
						>
							<Select.Option value="x">xx</Select.Option>
						</Select>
					</Col>

					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Select
							style={{
								width:'100%'
							}}
							placeholder="选择类型"
						>
							<Select.Option value={0}>试学学员</Select.Option>
							<Select.Option value={1}>vip学员</Select.Option>
						</Select>
					</Col>
					<Col style={colStyle} xs={span.xs} sm={span.sm} lg={span.lg} md={span.md}>
						<Button type="primary">查询</Button>
					</Col>
				</Row>
				{this.renderTable()}
				<div className="pager">
					<Pagination
						current={this.state.page}
						total={this.state.total}
						onChange={(e) => {
							this.setState({
								page: e
							})
						}}
					/>
				</div>
			</Layout>
		);
	}

	componentWillMount() {
		this.getStudentList();
	}

    /**
     * 获取学生列表
     */
	public getStudentList() {
		const { page, rows } = this.state
		this.setState({
			loading: true
		})
		queryStudent({
			page,
			rows
		}).then(res => {
			this.setState({
				studentList: res.data.rows,
				total: res.data.total,
				loading: false
			})
		})
	}
}

export default StudentList

