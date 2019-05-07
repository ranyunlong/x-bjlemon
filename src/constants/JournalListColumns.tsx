import React from 'react';
import { ColumnProps } from "antd/lib/table";
import { Divider } from 'antd';
import { JournalInfo } from '../api/getJournalList';
import { JournalList } from '../pages/x/journal/JournalList';
import { htmlToMarkdown, htmlToMarkdown2 } from '../utils/htmlToMarkdown';

/**
 * 教学日志列表表格项目
 * @param this
 */
export function getJournalListColumns(this: JournalList) {
    const JournalListColumns: ColumnProps<JournalInfo>[] = [
        {
            title: 'ID',
            key: 'jouCode',
            fixed: 'left',
            align: 'center',
            width: 150,
            dataIndex: 'jouCode'
        },
        {
            title: '上课日期',
            width: 150,
            key: 'skDate',
            align: 'center',
            dataIndex: 'skDate'
        },
        {
            title: '班级名称',
            width: 160,
            key: 'className',
            align: 'center',
            dataIndex: 'className'
        },
        {
            title: '课程名称',
            key: 'skName',
            align: 'left',
            dataIndex: 'skName'
        },
        {
            title: '状态',
            width: 150,
            key: 'jouStatus',
            align: 'center',
            dataIndex: 'jouStatus'
        },
        {
            title: '讲师名称',
            width: 100,
            key: 'teacherName',
            align: 'center',
            // fixed: 'right',  
            dataIndex: 'teacherName'
        },
        {
            title: '操作',
            width: 120,
            fixed: 'right',
            align: 'center',
            render: (text, record: JournalInfo) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <a 
                            onClick={() => {
                                const { khWork, skName, skPlan, skTime } = record
                                this.props.form.setFieldsValue({
                                    khWork: htmlToMarkdown2(khWork),
                                    skName,
                                    skPlan,
                                    skTime
                                });
                                this.setState({
                                    modalTitle: '编辑日志'
                                })
                            }} 
                            href="javascript:;"
                        >
                            编辑
                        </a>
                        <Divider type="vertical" />
                        <a style={{color: 'red'}} href="javascript:;">删除</a>
                    </div>
                )
            }
        }
    ]
    return JournalListColumns;
}