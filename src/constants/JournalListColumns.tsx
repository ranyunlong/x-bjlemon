import React from 'react';
import { ColumnProps } from "antd/lib/table";
import { Divider } from 'antd';
import { JournalInfo } from '../api/getJournalList';

export function getJournalListColumns() {
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
            key: 'className',
            align: 'center',
            dataIndex: 'className'
        },
        {
            title: '课程名称',
            width: 150,
            key: 'skName',
            align: 'center',
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
            render: () => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <a href="javascript:;">编辑</a>
                        <Divider type="vertical" />
                        <a style={{color: 'red'}} href="javascript:;">删除</a>
                    </div>
                )
            }
        }
    ]
    return JournalListColumns;
}