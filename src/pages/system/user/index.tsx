import { Delete, Down, Plus } from '@icon-park/react'
import { Button, Form, Modal, Row, Space, Table, TableProps, theme } from 'antd'
import React, { useState } from 'react'
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

export default function User() {
  const [form] = Form.useForm()
  const { token } = theme.useToken()

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

  const cancelUserModal = () => {
    setUserModalState(false)
  }

  const handleUserModal = () => {
    console.log('hanldeusermodal')
    setUserModalState(false)
  }

  return (
    <>
      <Form form={form} name="query-bar">
        <Row gutter={24}></Row>
        <div className="align-right">
          <Space size="small">
            <Button type="primary">搜索</Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              重置
            </Button>
            <Button type="link" icon={<Down theme="outline" size="16" fill={token.colorPrimary} />}>
              展开
            </Button>
          </Space>
        </div>
      </Form>
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
