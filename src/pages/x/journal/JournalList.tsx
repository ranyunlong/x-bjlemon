import './Journal.less';
import React, { Component } from 'react';
import { Layout, Row, Col, Select, Table, Pagination, Modal, Form, Input, Button } from 'antd';
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
import CodeMirror from '../../../components/CodeMirror'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { markdownToHtml } from '../../../utils/markdownToHtml';


interface IJournalListProps {
    location: Location;
    history: History;
    setPanes(panes: TabPane[], activePane: string): void;
    panes: TabPane[];
    activePane: string;
    form: WrappedFormUtils;
}

interface IJournalListState {
    total: number;
    classList: ClassInfo[];
    page: number;
    rows: number;
    journalList: JournalInfo[];
    classActiveId?: number;
    loading?: boolean;
    modalTitle?: string | null | undefined;
}

@bindLifecycle
export class JournalList extends Component<IJournalListProps, IJournalListState> {
    readonly state: IJournalListState = {
        classList: [],
        total: 0,
        page: 1,
        rows: 20,
        journalList: [],
        modalTitle: null
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

    public renderModal() {
        const { modalTitle } = this.state
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                width={700}
                title={modalTitle}
                visible={!!modalTitle}
                maskClosable={false}
                onOk={() => {
                    this.props.form.validateFields((e, value) => {
                        if (!e) {
                            value.khWork = markdownToHtml(value.khWork || '').replace(/(\r|\n)/g, '')
                        }
                    })
                }}
                onCancel={() => {
                    this.setState({
                        modalTitle: null
                    })
                }}
                
            >
                <Form>
                    <Form.Item
                        label="课程名称"
                    >
                        {
                            getFieldDecorator('skName', {
                                rules: [
                                    {required: true, message: '课程名称必须'}
                                ]
                            })(
                                <Input
                                    placeholder="课程名称"
                                />
                            )
                        }
                        
                    </Form.Item>

                    <Form.Item
                        label="上课时长"
                    >
                        {
                            getFieldDecorator('skTime', {
                                rules: [
                                    {required: true, message: '上课时长必须'}
                                ]
                            })(
                                <Select>
                                    <Select.Option value="2小时">2小时</Select.Option>
                                    <Select.Option value="2.5小时">2.5小时</Select.Option>
                                    <Select.Option value="3小时">3小时</Select.Option>
                                </Select>
                            )
                        }
                        
                    </Form.Item>

                    <Form.Item
                        label="授课计划"
                    >
                        {
                            getFieldDecorator('skPlan', {
                                rules: [
                                    {required: true, message: '授课计划必须'}
                                ],
                                trigger: 'onBlur',
                                valuePropName: 'value'
                            })(
                                <CodeMirror
                                    style={{
                                        lineHeight: '22px',
                                        height: 200
                                    }}
                                />
                            )
                        }
                    </Form.Item>

                    <Form.Item
                        label="当日作业"
                    >
                        {
                            getFieldDecorator('khWork',{
                                trigger: 'onBlur',
                                valuePropName: 'value'
                            })(
                                <CodeMirror
                                    style={{
                                        lineHeight: '22px',
                                        height: 200
                                    }}
                                />
                            )
                        }
                    </Form.Item>
                </Form>
            </Modal>
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
                <div className="pager">
                    <Pagination total={this.state.total} current={this.state.page} />
                </div>

                {this.renderModal()}
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

    componentDidUpdate(prevProps: IJournalListProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.getJournalList()
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


const JournalListPage = Form.create({name: 'JournalList'})(JournalList)

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
)(JournalListPage as any);