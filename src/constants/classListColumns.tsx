import React from 'react';
import { ColumnProps } from "antd/lib/table";
import { ClassInfo } from '../api/getClassList';
import { Divider } from 'antd';
import { ClassListPage } from '../pages/x/class/ClassList';


/**
 * 班级列表表格项目
 * @param this
 */
export function getClassListColumns(this: ClassListPage) {
    const classListColumns: ColumnProps<ClassInfo>[] = [
        {
            title: 'id',
            key: 'classId',
            fixed: 'left',
            width: 100,
            dataIndex: 'classId'
        },
        {
            title: '授课教师',
            width: 150,
            fixed: 'left',
            key: 'teacher',
            align: 'center',
            dataIndex: 'teacher'
        },
        {
            title: '班级名称',
            key: 'className',
            align: 'center',
            dataIndex: 'className'
        },
        {
            title: '开始时间',
            width: 150,
            key: 'startTime',
            align: 'center',
            dataIndex: 'startTime'
        },
        {
            title: '结束时间',
            width: 150,
            key: 'endTime',
            align: 'center',
            dataIndex: 'endTime'
        },
        
        {
            title: '助教',
            width: 150,
            key: 'zjName',
            align: 'center',
            dataIndex: 'zjName'
        },
        {
            title: '状态',
            width: 100,
            key: 'classStatus',
            align: 'center',
            // fixed: 'right',  
            dataIndex: 'classStatus'
        },
        {
            title: '操作',
            width: 350,
            fixed: 'right',
            align: 'center',
            render: (text, record) => {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <a href="javascript:;">短信提醒</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">学生列表</a>
                        <Divider type="vertical" />
                        <a onClick={() => {
                            const url = `/x/journal/opJouranlList_my.action.shtml?classId=${record.classId}&t=${new Date().getTime()}`
                            this.props.history.push(url)
                            this.props.panes.push({
                                title: record.className + `助教日志`,
                                url: url,
                                closable: true
                            })

                            this.props.setPanes(this.props.panes, url);
                        }} href="javascript:;">助教日志</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">开课</a>
                        <Divider type="vertical" />
                        <a href="javascript:;">结课</a>
                    </div>
                )
            }
        }
    ]
    return classListColumns;
}