import React, { Component } from 'react';
import { Layout, Row, Col, Select, Button, Table, Pagination } from 'antd';
import './Class.less';
import { Location, History } from 'history';
import { getStageList, StageInfo } from '../../../api/getStageList';
import { getLecturerList, LecturerInfo } from '../../../api/getLecturerList';
import { getClassList, ClassInfo } from '../../../api/getClassList';
import { getUserAction } from '../../../api/getUserAction';
import { getClassListColumns } from '../../../constants/classListColumns';
import { span, colStyle } from '../../../constants/searchRowCol';

interface IClassListProps {
	location: Location;
	history: History;
}

interface IClassListState {
	stageList: StageInfo[];
	lecturerList: LecturerInfo[];
	lecturerGroup: { [key: string]: LecturerInfo[] }
	page: number;
	rows: number;
	total: number;
	classList: ClassInfo[];
}

class ClassList extends Component<IClassListProps, IClassListState> {
	readonly state: IClassListState  = {
		stageList: [],
		lecturerList: [],
		lecturerGroup: {},
		page: 1,
		rows: 20,
		total: 0,
		classList: [],
	}

	public renderTable() {
		const { classList } = this.state;
		return (
			<div className="class-list-table">
				<Table
					rowSelection={{
						onChange: (e) => {

						}
					}}
					size="small"
					rowKey="classId"
					pagination={false}
					scroll={{
						x: 1300,
						y: 300
					}}
					columns={getClassListColumns.call(this)}
					dataSource={classList}
				/>
			</div>
		)
	}

	public render() {
		const { stageList, lecturerGroup } = this.state
		return (
			<Layout className="class-list-page">
				<Row
					gutter={16}
				>
					<Col style={colStyle} xs={span.xs} sm={span.sm} md={span.md} lg={span.lg}>
						<Select
							placeholder="选择阶段"
							style={{
								width: '100%'
							}}
						>
							{
								stageList.map(item => (
									<Select.Option
										key={item.stageId}
										value={item.stageId}
										title={item.stageName}
									>
										{item.stageName}
									</Select.Option>
								))
							}
						</Select>
					</Col>

					<Col style={colStyle} xs={span.xs} sm={span.sm} md={span.md} lg={span.lg}>
						<Select
							placeholder="选择讲师"
							style={{
								width: '100%'
							}}
						>
							{
								Object.keys(lecturerGroup).map(key => {
									// lecturerGroup[key]
									return (
										<Select.OptGroup label={key} key={key}>
											{
												lecturerGroup[key].map(item => {
													return (
														<Select.Option
															key={item.id} 
															value={item.id}
															title={item.dataValue}
														>
															{item.dataValue}
														</Select.Option>
													)
												})
											}
										</Select.OptGroup>
									)
								})
							}
						</Select>
					</Col>
						
					<Col style={colStyle} xs={span.xs} sm={span.sm} md={span.md} lg={span.lg}>
						<Button type="primary">查询</Button>
					</Col>
				</Row>
				{this.renderTable()}
				<div className="pager">
					<div className="btns">
						<Button style={{marginRight: 10}} type="default">批量短信提醒</Button>
						<Button style={{marginRight: 10}}  type="primary">批量开课</Button>
						<Button type="danger">批量结课</Button>
					</div>
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
		this.getDatas()
	}

	public async getDatas() {
		this.getStageList()
		this.getLecturerList()
		this.getClassList()
	}

	public async getLecturerList() {
		getLecturerList().then(res => {
			const list: {[key: string]: LecturerInfo[]} = {}
			res.data.forEach(item => {
				if (list[item.dataGroup]) {
					list[item.dataGroup].push(item);
				} else {
					list[item.dataGroup] = [item]
				}
			})
			this.setState({
				lecturerList: res.data,
				lecturerGroup: list
			})
		})
	}

	public async getStageList() {
		getStageList().then(res => {
			this.setState({
				stageList: res.data
			})
		})
	}

	public async getClassList() {
		const { page, rows } = this.state
	 	const uAction = await getUserAction()
		getClassList({
			teaId: uAction.data.user.teaId,
			page,
			rows
		}).then((res) => {
			this.setState({
				classList: res.data.rows,
				total: res.data.total
			})
		})
	}
}

export default ClassList
