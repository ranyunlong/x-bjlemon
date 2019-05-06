import React from 'react';
import { ColumnProps } from "antd/lib/table";
import { StudentInfo } from "../api/queryStudent";
import { Button } from "antd";

export function getStudentListColumns() {
    const studentListColumns: ColumnProps<StudentInfo>[] = [
        {
            title: 'id',
            key: 'stuId',
            fixed: 'left',
            width: 100,
            dataIndex: 'stuId'
        },
        {
            title: '姓名',
            width: 100,
            key: 'stuName',
            fixed: 'left',
            dataIndex: 'stuName'
        },
        {
            title: '入学班级',
            width: 80,
            key: 'stuClass',
            align: 'center',
            dataIndex: 'stuClass'
        },
        {
            title: 'QQ',
            width: 150,
            key: 'stuQq',
            align: 'center',
            dataIndex: 'stuQq'
        },
        {
            title: '邮箱',
            key: 'stuEmail',
            align: 'center',
            dataIndex: 'stuEmail'
        },
        {
            title: '电话',
            width: 150,
            key: 'stuPhone',
            align: 'center',
            dataIndex: 'stuPhone'
        },
        {
            title: '类型',
            width: 150,
            key: 'type',
            align: 'center',
            dataIndex: 'type'
        },
        {
            title: '状态',
            width: 100,
            key: 'stuStatus',
            align: 'center',
            fixed: 'right',
            dataIndex: 'stuStatus'
        },
        {
            title: '操作',
            width: 100,
            fixed: 'right',
            align: 'center',
            render: () => {
                return (
                    <span>
                        <Button size="small" type="primary">详细</Button>
                    </span>
                )
            }
        }
    ]
    return studentListColumns;
}