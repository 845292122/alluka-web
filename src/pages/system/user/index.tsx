import { Delete, Plus } from '@icon-park/react'
import { Button, Modal, Space, Table, TableProps } from 'antd'
import React, { useState } from 'react'
import QueryForm, { QueryFormField } from '~/components/QueryForm'
import { USER } from '~/types/user'

const UserInfo: React.FC<USER.UserModal> = props => {
  const { open, onOk, confirmLoading, onCancel } = props

  return (
    <Modal
      title="用户详情"
      open={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      keyboard={false}
      maskClosable={false}
    >
      <p>表单内容</p>
    </Modal>
  )
}

const User: React.FC = () => {
  const [userModalState, setUserModalState] = useState<boolean>(false)
  const tableColumns: TableProps<USER.UserTableVO>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: text => <a>{text}</a>
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt'
    }
  ]
  const queryFields: Array<QueryFormField> = [
    { name: 'name', label: '名称', type: 'input' },
    { name: 'phone', label: '电话', type: 'input' },
    {
      name: 'status',
      label: '状态',
      type: 'select',
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 }
      ]
    }
  ]

  const cancelUserModal = () => {
    setUserModalState(false)
  }

  const handleUserModal = () => {
    console.log('hanldeusermodal')
    setUserModalState(false)
  }

  return (
    <>
      <QueryForm fields={queryFields} onSearch={() => {}} />
      <Space size={'small'} className="mt-20 mb-5">
        <Button type="primary" icon={<Plus theme="outline" size="14" fill="#ffffff" />} onClick={() => setUserModalState(true)}>
          新增
        </Button>
        <Button type="primary" danger icon={<Delete theme="outline" size="14" fill="#ffffff" />}>
          删除
        </Button>
      </Space>
      <Table<USER.UserTableVO> columns={tableColumns} />
      <UserInfo open={userModalState} onOk={handleUserModal} onCancel={cancelUserModal} />
    </>
  )
}

export default User
