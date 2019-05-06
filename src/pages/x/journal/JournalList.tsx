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
import { connect } from 'react-redux';
import { TabPane, setPanesAction } from '../../../store/reducers/xsystem/action';
import { Reducers } from '../../../store';
import { bindLifecycle } from 'react-keep-alive';


interface IJournalListProps {
    location: Location;
    history: History;
    setPanes(panes: TabPane[], activePane: string): void;
    panes: TabPane[];
    activePane: string;
}

interface IJournalListState {
    total: number;
    classList: ClassInfo[];
    page: number;
    rows: number;
    journalList: JournalInfo[];
    classActiveId?: number;
    loading?: boolean;
}

@bindLifecycle
class JournalList extends Component<IJournalListProps, IJournalListState> {
    readonly state: IJournalListState = {
        classList: [],
        total: 0,
        page: 1,
        rows: 20,
        journalList: []
    }

    public renderTable() {
        const { journalList, loading } = this.state
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
                    loading={loading}
                    pagination={false}
                    columns={getJournalListColumns.call(this)}
                    dataSource={journalList}
                />
            </div>
        )
    }

    public render() {
        const { classList, classActiveId } = this.state
        return (
            <Layout className="journal-list-page">
                <Row
                    gutter={16}
                >
                    <Col style={colStyle} xs={span.xs} lg={span.lg} sm={span.sm} md={span.md}>
                        {
                            classList.length > 0 ? (
                                <Select
                                    style={{
                                        width: '100%'
                                    }}
                                    value={classActiveId}
                                    placeholder="选择班级"
                                    onChange={(classId) => {
                                        this.setState({
                                            classActiveId: classId
                                        })
                                        const url = `${this.props.location.pathname}?classId=${classId}&t=${new Date().getTime()}`
                                        this.props.history.push(url)
                                        const find = this.props.panes.find(item => item.url === this.props.activePane)
                                        
                                        if (find) {
                                            const findClass = this.state.classList.find(item => item.classId === classId)
                                            find.url = url
                                            find.title = findClass ? findClass.className + `助教日志` : find.title
                                            this.props.setPanes(this.props.panes, url)
                                        }
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
                            ):
                            null
                        }
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

    componentDidMount() {
        const { search } = this.props.location
        const data = Qs.parse(search.replace(/^\?/, ''))
        if (data && !data.classId) {
            this.setState({
                classActiveId: undefined
            })
        }
    }

    /**
     * 获取教学日志列表
     */
    public async getJournalList() {
        const { rows, page } = this.state
        const { search } = this.props.location
        const data = Qs.parse(search.replace(/^\?/, ''))
        

        if (data && data.classId) {
            if (!isNaN(Number(data.classId))) {
                this.setState({
                    classActiveId: Number(data.classId),
                    loading: true
                })
            } else {
                this.setState({
                    classActiveId: undefined,
                    loading: true
                })
            }
            getJournalList({
                classId: Number(data.classId),
                rows,
                page
            }).then(res => {
                this.setState({
                    journalList: res.data.rows,
                    total: res.data.total,
                    loading: false
                })
            })
        } else {
            this.setState({
                journalList: []
            })
        }
    }

    componentDidUpdate(prevProps: IJournalListProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.getJournalList()
        }
    }
    

    /**
     * 获取班级列表
     */
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


export default connect(
    (state: Reducers)=> ({
        panes: state.xSystem.panes,
        activePane: state.xSystem.activePane
    }),
    (dispatch: any) =>({
        setPanes(panes: TabPane[], activePane: string) {
			dispatch(new setPanesAction(panes, activePane).getAction())
		},
    })
)(JournalList);