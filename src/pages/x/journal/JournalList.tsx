import './Journal.less';
import React, { Component } from 'react';
import { Layout, Row, Col, Select, Table } from 'antd';
import { colStyle, span } from '../../../constants/searchRowCol';
import { getClassList, ClassInfo } from '../../../api/getClassList';
import { getUserAction } from '../../../api/getUserAction';
import { Location, History } from 'history';
import { getJournalList, JournalInfo } from '../../../api/getJournalList';
import Qs from 'qs';
import { getJournalListColumns } from '../../../constants/JournalListColumns';


interface IJournalListProps {
    location: Location;
    history: History;
}

interface IJournalListState {
    total: number;
    classList: ClassInfo[];
    page: number;
    rows: number;
    journalList: JournalInfo[];
}

class JournalList extends Component<IJournalListProps, IJournalListState> {
    readonly state: IJournalListState = {
        classList: [],
        total: 0,
        page: 1,
        rows: 20,
        journalList: []
    }

    public renderTable() {
        const { journalList } = this.state
        return (
            <div
                className="journal-list-table"
            >
                <Table
                    scroll={{
                        x: 1300,
                        y: 300
                    }}
                    rowKey="jouCode"
                    size="small"
                    pagination={false}
                    columns={getJournalListColumns.call(this)}
                    dataSource={journalList}
                />
            </div>
        )
    }

    public render() {
        const { classList } = this.state
        return (
            <Layout className="journal-list-page">
                <Row
                    gutter={16}
                >
                    <Col style={colStyle} xs={span.xs} lg={span.lg} sm={span.sm} md={span.md}>
                        <Select
                            style={{
                                width: '100%'
                            }}
                            placeholder="选择班级"
                            onChange={(classId) => {
                                // console.log(classId)
                                this.props.history.push(`${this.props.location.pathname}?classId=${classId}`)
                            }}
                        >
                            {
                                classList.map(item => {
                                    return (
                                        <Select.Option
                                            value={item.classId}
                                            title={item.className}
                                            key={item.classId}
                                            disabled={item.classStatus === '已结束'}
                                        >
                                            {item.className}
                                        </Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Col>
                </Row>
                {this.renderTable()}
            </Layout>
        );
    }

    componentWillMount() {
        this.getClassList()
        this.getJournalList()
    }

    public async getJournalList() {
        const { rows, page } = this.state
        const { search } = this.props.location
        console.log(this)
        const data = Qs.parse(search.replace(/^\?/, ''))
        if (data && data.classId) {
            getJournalList({
                classId: Number(data.classId),
                rows,
                page
            }).then(res => {
                this.setState({
                    journalList: res.data.rows,
                    total: res.data.total
                })
            })
        }
    }
    

    public async getClassList() {
       const user = await getUserAction();
        getClassList({
            teaId: user.data.user.teaId,
            rows: 1000,
            page: 1
        }).then(res => {
            this.setState({
                classList: res.data.rows
            })
        })
    }
}


export default JournalList;